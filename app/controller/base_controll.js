'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(params = {}) {
    this.ctx.body = {
      success: true,
      code: 200,
      ...params,
    };
  }
  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;
