const ArticleModel = require('../models/article');
const ServiceStatus = require('./status.config');
var BaseController = require('./BaseController');
class ArticleController {

    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        if (req.title // 文章标题
            && req.author // 文章作者
            && req.content // 文章内容
            && req.category // 文章分类
        ) {
            try {
                // 创建文章模型
                const ret = await ArticleModel.createArticle(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await ArticleModel.getArticleDetail(ret.id);
                let res = BaseController.success({ data, msg: '创建文章成功~' })
                ctx.body = {
                    ...res
                }

            } catch (err) {
                let res = BaseController.fail({ code: 412, msg: '创建文章失败~', err })
                ctx.body = {
                    ...res
                }
            }
        } else {
            let res = BaseController.fail({ code: 416, msg: '参数不齐全~', err })
            ctx.body = {
                ...res
            }
        }

    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询文章详情模型
                let data = await ArticleModel.getArticleDetail(id);
                let res = BaseController.success({ data })
                ctx.body = {
                    ...res
                }

            } catch (err) {
                let res = BaseController.fail({ err })
                ctx.body = {
                    ...res
                }
            }
        } else {
            let res = await BaseController.fail({ code: 416, msg: '文章ID必须传' })
            ctx.body = {
                ...res
            }
        }
    }

    /*
    * 查询文章列表
    * page  分页数
    * limit 每页数
    *
    * */
    static async getList(ctx) {
        let param = ctx.request.body;
        try {
            let data = await ArticleModel.getArticleList(param);
            let res = BaseController.success({ data })
            ctx.body = {
                ...res
            }
        } catch (err) {
            let res = BaseController.fail({ err });
            ctx.body = {
                ...res
            }
        }
    }
    /*
    * 修改文章
    * */
    static async updateArticle(ctx) {
        let data = ctx.request.body;
        if (data.id) {
            const rdata = await ArticleModel.updateArticle(data);
            let res = BaseController.success({ data: rdata })
            ctx.body = {
                ...res
            }
        } else {
            let res = BaseController.fail({ msg: 'id为必选项目~' })
            ctx.response.status = ServiceStatus.fail.code;
            ctx.body = {
                ...res
            }
        }
    }
    /*
    * 删除文章 id
    * */
    static async deleteArticle(ctx) {
        let data = ctx.request.body;

        if (!isNaN(data.id)) {
            const res = await ArticleModel.deleteArticle(data);
            if (res) {
                let data = BaseController.success({})
                ctx.body = {
                    ...data
                }
            } else {
                let res = BaseController.fail({ msg: 'id不正确' })
                ctx.body = {
                    ...res
                }
            }

        } else {
            let res = BaseController.fail({ msg: 'id为必选项' })
            ctx.body = {
                ...res
            }
        }
    }


}


module.exports = ArticleController;

