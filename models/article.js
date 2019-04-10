// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../db/config');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Article = Sequelize.import('../schema/article');
// 自动创建表
Article.sync({
    force: false //是否删除原表
});

//数据库语句操作后返回的值
class ArticleModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createArticle(data) {
        return await Article.create({
            title: data.title, // 文章标题
            author: data.author, // 文章作者
            content: data.content, // 文章内容
            category: data.category, // 文章分类
        })
    }

    /**
     * 查询取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getArticleDetail(id) {
        return await Article.findOne({
            where: {
                id,
            },
        })
    }
    /*
    * 获取列表
    * */
    static async getArticleList(param){
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
    /*
    * 更新数据
    * */
    static async updateArticle(data){
        return await Article.update({
            title: data.title, // 文章标题
            author: data.author, // 文章作者
            content: data.content, // 文章内容
            category: data.category, // 文章分类
        },{
            where: {
               id: data.id
            }
        })
    }
    /*
    * 删除数据
    * */
    static async deleteArticle(data){
        return await Article.destroy({
            where: {
                id: data.id
            }
        })
    }


}

module.exports = ArticleModel;

