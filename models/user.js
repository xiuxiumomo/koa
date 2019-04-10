// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../db/config');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Article = Sequelize.import('../schema/user');
// 自动创建表
Article.sync({
    force: false //是否删除原表
});

//数据库语句操作后返回的值
class dataMode {
    /** 创建用户

     * */
    static async createData(data) {
        return await Article.create({
            name: data.name, // 用户名
            email: data.email, // 邮箱
            password: data.password //密码

        })
    }
    /*
    * 用户登录
    * */
    static async checkData(data){
        return await Article.findOne({
            where: {
                name: data.name,
                password: data.password
            }

        })
    }

    /**
     * 获取详情
     */
    static async getData(id) {
        return await Article.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['password']
            }
        })
    }
    /**
     * 获取列表
     *
     * */
    static async getAllList(param){
        let { page=1, limit = 10 } = param;
        let res = await Article.findAndCountAll({
            limit: Number(limit),
            offset: (page-1)*limit,
        });
        return {
            data: res.rows,
            count: res.count
        }
    }
    /**
     * 修改数据
     * */
    static async updateData(data){
        return await Article.update({
            name: data.name, //
            email: data.email, //
            password: data.password
        },{
            where: {
                id: data.id
            }
        })
    }
    /**
     * 删除数据
     * */
    static async deleteData(data){
        return await Article.destroy({
            where: {
                id: data.id
            }
        })
    }


}

module.exports = dataMode;

