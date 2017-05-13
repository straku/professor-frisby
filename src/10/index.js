const { Map, List } = require('immutable-ext');
const { Sum } = require('../monoid');

// with native reduce
console.log(
  List.of(Sum(1), Sum(2), Sum(3))
  .reduce((acc, x) => acc.concat(x), Sum.empty())
);

// with List fold
console.log(
  List.of(Sum(1), Sum(2), Sum(3))
  .fold(Sum.empty())
);

// different use of fold compared to Box or Right / Left type
// but the same definition / intuition, like map but droping down one level
// in Box removal value from type, in collection of Monoids removing / reducing
// collection to one Monoid

// with Map fold
console.log(
  Map({ brian: Sum(3), sara: Sum(5) })
  .fold(Sum.empty())
);

// operating on pure values, not Monoids
console.log(
  Map({ brian: 3, sara: 5 })
  .map(Sum)
  .fold(Sum.empty())
);

console.log(
  List.of(1, 2, 3)
  .map(Sum)
  .fold(Sum.empty())
);

// the same as above but with foldMap
console.log(
  List.of(1, 2, 3)
  .foldMap(Sum, Sum.empty())
);

