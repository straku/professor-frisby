// imperative
{
  const moneyToFloat = str => parseFloat(str.replace('$', ''));

  const percentToFloat = str => {
    const replaced = str.replace('%', '');
    const number = parseFloat(replaced);
    return number * 0.01;
  };

  const applyDiscount = (price, discount) => {
    const cost = moneyToFloat(price);
    const savings = percentToFloat(discount);
    return cost - cost * savings;
  };

  console.log(applyDiscount('$5.00', '20%'));
}

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
});

const moneyToFloat = str =>
  Box(str => str.replace('%', ''))
  .map(replaced => parseFloat(replaced));

const percentToFloat = str =>
  Box(str.replace('%', ''))
  .map(replaced => parseFloat(replaced))
  .map(number => number * 0.01);

const applyDiscount = (price, discount) => 
  moneyToFloat(price)
  .fold(cost =>
    percentToFloat(discount)
    .fold(savings => 
      cost - savings * cost))

console.log(applyDiscount('$5.00', '20%'))