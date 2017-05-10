// type Either = Right || Left

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

// Right will invoke functions in map, result: 2
console.log(Right(3).map(x => x + 1).map(x => x / 2));

// Left doesn't care about functions in map, result: 3
console.log(Left(3).map(x => x + 1).map(x => x / 2));

// Right will run second function in fold, result: 2
console.log(Right(3).map(x => x + 1).map(x => x / 2).fold(x => 'err', x => x));

// Left will run first function in fold, result: 'err'
console.log(Left(3).map(x => x + 1).map(x => x / 2).fold(x => 'err', x => x));

// imperative
{
  const findColor = name => 
    ({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' })[name];

  console.log(findColor('red').slice(1).toUpperCase());
  // console.log(findColor('green').slice(1).toUpperCase()); TypeError
}

// with Either type
{
  const fromNullable = x =>
    x != null ? Right(x) : Left(null);

  const findColor = name => {
    const colors = { red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' };
    const found = colors[name];
    return found !== undefined ? Right(found) : Left(null);
  }

  // for 'green' result: 'no color'
  // for 'red' result: '#ff4444'
  const result = findColor('green')
                 .map(c => c.slice(1))
                 .fold(e => 'no color',
                       c => c.toUpperCase());

  console.log(result);
}

// removing multiple expressions from findColor function
{
  const fromNullable = x =>
    x != null ? Right(x) : Left(null);

  const findColor = name => 
    fromNullable(
      ({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' })[name]
    );

  // for 'green' result: 'no color'
  // for 'red' result: '#ff4444'
  const result = findColor('green')
                 .map(c => c.slice(1))
                 .fold(e => 'no color',
                       c => c.toUpperCase());

  console.log(result);
}


