var development_env = require('./development');
var production_env = require('./production');
module.exports = {
    development: development_env,
    production: production_env
}[process.env.NODE_ENV||'development']