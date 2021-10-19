db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      media: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            { $multiply: [3600000] },
          ],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$media", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
