define([], function () {
  throw new Error('throwing error from dependency');
  return 'util';
});
