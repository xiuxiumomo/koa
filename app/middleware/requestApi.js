'use strict';

module.exports = options => {
  console.log(options);
  return async function requestApi(ctx, next) {
    console.log(ctx, next);
  };
};
