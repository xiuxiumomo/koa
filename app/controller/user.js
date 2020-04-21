'use strict';
const Controller = require('./base_controll');
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
  // 获取用户列表
  async getList() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.getList();
    this.success({ data: userInfo });
  }
  // 按照条件查询列表
  async postList() {
    const { ctx } = this;
    const params = ctx.request.body;
    const userInfo = await ctx.service.user.postList(params);
    this.success(userInfo);
  }
}
module.exports = UserController;
