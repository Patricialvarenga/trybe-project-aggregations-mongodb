db.movies.aggregate([
  { $match: { awards: { $regex: /^won\s\d+\sOscar/gi } } },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      avg: { $avg: "$imdb.rating" },
      desvio: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$avg", 1] },
      desvio_padrao: { $round: ["$desvio", 1] },
    },
  },
]);
