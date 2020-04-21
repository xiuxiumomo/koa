'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      msg: '成功',
      data,
    };
  }
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
