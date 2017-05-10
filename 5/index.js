// pseudo code, riddled with runtime errors
// used by me for exercise purposes only

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

// ---------- example 1 ----------

const openSite = () => {
  if (current_user) {
    return renderPage(current_user);
  } else {
    return showLogin();
  }
}

const openSite = () =>
  fromNullable(current_user)
  .fold(showLogin, renderPage);

// ---------- example 2 ---------

const getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences);
  } else {
    return defaultPrefs;
  }
}

const getPrefs =>
  (user.premium ? Right(user) : Left('not_premium'))
  .map(u => u.preferences)
  .fold(() => defaultPrefs,
        prefs => loadPrefs(prefs));

// ---------- example 3 ----------

const streetName = user => {
  const { address } = user;

  if (address) {
    const { street } = address;

    if (street) {
      return street.name;
    }
  }

  return 'no street';
}

const streetName = user =>
  fromNullable(user.address)
  .chain(a => fromNullable(a.street))
  .map(s => s.name)
  .fold(() => 'no street', n => n);

// ---------- example 4 ----------

const concatUniq = (x, ys) => {
  const found = ys.filter(y => y === x)[0];
  return found ? ys : ys.concat(x);
}

const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0])
  .fold(() => ys.concat(x), () => ys);

// ---------- example 5 ---------

const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath);
    } catch (e) { }
  }
  return example;  
}

const wrapExamples = example =>
  fromNullable(example.previewPath)
  .chain(p => tryCatch(fs.readFileSync(p)))
  .fold(() => example,
        p => Object.assign({ preview: p }, example));

// ---------- example 6 ----------

const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg);
    if (c.url) {
      return c.url.match(/postgres/);
    }
  } catch (e) {
    return null;
  }
}

const parseDbUrl = cfg =>
  tryCatch(() => JSON.parse(cfg))
  .chain(c => fromNullable(c.url))
  .fold(() => null,
        url => url.match(/postgres/));