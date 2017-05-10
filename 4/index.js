const fs = require('fs');

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = x =>
  x != null ? Right(x) : Left(null);

const tryCatch = f => {
  try {
    return Right(f());
  } catch(e) {
    return Left(e);
  }
}

// imperative
{
  const getPort = () => {
    try {
      const str = fs.readFileSync('config.json');
      const config = JSON.parse(str);
      return config.port;
    } catch(e) {
      return 3000;
    }
  }

  console.log(getPort());
}

// with Either type
{
  const getPort = () =>
    tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000,
          c => c.port)

  console.log(getPort());  
}
