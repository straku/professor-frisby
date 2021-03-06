// Semigroup is a type with concat method

// string is a Semigroup because it has concat method
{
  const result = 'a'.concat('b').concat('c');
  console.log(result);
}

// array is a Semigroup because it has concat method
{
  const result = [1, 2].concat([3, 4]).concat([5, 6]);
  console.log(result);
}

// Semigroups are associative
{
  console.log(1 + (1 + 1) === (1 + 1) + 1);
  console.log('a'.concat('b').concat('c') === 'a'.concat('b'.concat('c')));
}

// Sum Semigroup
const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`,
});

console.log(Sum(1).concat(Sum(2)));

// All Semigroup
// true && false -> false
// true && true -> true
const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`,
});

console.log(All(true).concat(All(true)));

// First Semigroup
// always keeps the first value without concatenating new values
const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`,
});

console.log(First('blah').concat(First('ice cream')));
