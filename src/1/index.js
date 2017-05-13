// imperative
{
  const nextCharForNumberString = str => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = number + 1;
    return String.fromCharCode(nextNumber);
  };

  console.log(nextCharForNumberString('  64  '));
}

// composed in one function expression
{
  const nextCharForNumberString = str =>
    String.fromCharCode(parseInt(str.trim()) + 1);

  console.log(nextCharForNumberString('  64  '));
}

// with native array as a container
{
  const nextCharForNumberString = str =>
    [str]
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i));

  console.log(nextCharForNumberString('  64  '));
}

// with Box type
{
  const Box = x => ({
    map: f => Box(f(x)),
    inspect: () => `Box(${x})`, // console.log displays result of this fn
  });

  const nextCharForNumberString = str =>
    Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i));

  console.log(nextCharForNumberString('  64  '));
}

// Box type with fold
{
  const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`, // console.log displays result of this fn
  });

  const nextCharForNumberString = str =>
    Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .fold(i => String.fromCharCode(i));

  console.log(nextCharForNumberString('  64  '));
}
