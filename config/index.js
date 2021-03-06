var development_env = require('./development');
var production_env = require('./production');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
let isDev = process.env.NODE_ENV.includes('development');
const currEnv = isDev ? development_env : production_env;
module.exports = currEnv;