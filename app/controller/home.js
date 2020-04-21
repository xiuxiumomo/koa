'use strict';

const Controller = require('./base_controll');

class HomeController extends Controller {
  async index() {
    this.success({ name: 'jack' });
  }
  async hello() {
    const { ctx } = this;
    ctx.body = 'hello';
  }
}

module.exports = HomeController;
