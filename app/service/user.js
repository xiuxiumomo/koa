'use strict';
const { Service } = require('egg');

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.query('select * from users where id = ?', uid);
    return user;
  }
  // 获取用户列表
  async getList() {
    const user = await this.app.mysql.query('select * from users');
    return user;
  }
  async postList(params = {}) {
    const { app } = this;
    const { age } = params;
    const data = await app.mysql.query(`select  * from users where age = ${age}`);
    const total = await app.mysql.query('select  count(*) as total from users');
    return {
      data,
      total: total[0].total,
    };
  }
}

module.exports = UserService;
