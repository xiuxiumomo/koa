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
  config.keys = appInfo.name + '_1585829556868_3404';
  config.middleware = [];
  const userConfig = {
    mysql: {
      client: {
        host: 'localhost',
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

  return {
    ...config,
    ...userConfig,
  };
};
