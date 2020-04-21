'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/user/getList', controller.user.getList);
  router.post('/api/user/getList', controller.user.postList);
};
