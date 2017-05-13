// Monoid is a Semigroup with special element that acts like an neutral identity

// 1 + 0 = 1
// 2 + 0 = 2
// x + 0 = x
// identity element -> 0

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`,
});

Sum.empty = () => Sum(0);

// true && true === true
// false && true === false
// identity element -> true

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`,
});

All.empty = () => All(true);

// First('hello').concat(?) === 'hello' // works for anything
// First(?).concat('hello') === ???
// there is no way to specify identity element for First Semigroup
// so we cannot promote it to Monoid
const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`,
});

// reduce examples (Semigroup / Monoid safety)

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0);

console.log(sum([1, 2, 3])) // 6
console.log(sum([])) // 0

const all = xs =>
  xs.reduce((acc, x) => acc && x, true);

console.log(all([true, false])) // false
console.log(all([])) // true

const first = xs =>
  xs.reduce((acc, x) => acc);

console.log(first([1, 2, 3])) // 1
try {
  console.log(first([])) // error
} catch (e) {}

// conclusions:
// Semigroup does not have an element to return so it's not a safe operation
// Monoid perfectly safe operation no matter how many elements, always returns
