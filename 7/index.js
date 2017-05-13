const { Map } = require('immutable-ext');

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`,
});

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`,
});

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`,
});

// const acc1 = { name: 'Nico', isPaid: true, points: 10, friends: ['Franklin'] };
// const acc2 = { name: 'Nico', isPaid: false, points: 2, friends: ['Gatsby'] };

// if the data structure is completely made up of Semigroups it will be
// a Semigroup itself. If I can concat all the pieces of my data structure
// then my data structure is therefore concatable.

const acc1 = Map({
  name: First('Nico'),
  isPaid: All(true),
  points: Sum(10),
  friends: ['Franklin'],
});

const acc2 = Map({
  name: First('Nico'),
  isPaid: All(false),
  points: Sum(2),
  friends: ['Gatsby'],
});

console.log(acc1.concat(acc2).toJS());
