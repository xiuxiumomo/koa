/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585829556868_3404';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    mysql: {
      client: {
        host: '193.112.176.177',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'egg_app',
      },
      app: true,
      agent: false,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
  };
  console.log('走的是product');

  return {
    ...config,
    ...userConfig,
  };
};
