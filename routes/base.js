const VERSION_PREFIX = '/api/v1';
const router = require('koa-router')();
router.prefix(VERSION_PREFIX);
module.exports = router;