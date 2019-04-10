const ArticleModel = require('../models/article');
const ServiceStatus = require('./status.config');

class articleController {
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

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建文章成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建文章失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
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
                ctx.response.status = ServiceStatus.success.code;
                ctx.body = {
                    code: ServiceStatus.success.code,
                    msg: ServiceStatus.success.msg,
                    data
                }

            } catch (err) {
                ctx.response.status = ServiceStatus.fail.code;
                ctx.body = {
                    code: ServiceStatus.fail.code,
                    msg: ServiceStatus.fail.msg,
                    err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '文章ID必须传'
            }
        }
    }

    /*
    * 查询文章列表
    * page  分页数
    * limit 每页数
    *
    * */
    static async getList(ctx){
        let param = ctx.request.body;
        try {
            let data = await ArticleModel.getArticleList(param);
            ctx.response.status = ServiceStatus.success.code;
            ctx.body = {
                code: ServiceStatus.success.code,
                msg: ServiceStatus.success.msg,
                data
            }
        } catch (err) {
            ctx.response.status = ServiceStatus.fail.code;
            ctx.body = {
                code: ServiceStatus.fail.code,
                msg: ServiceStatus.fail.msg,
                err

            }
        }
    }
    /*
    * 修改文章
    * */
    static async updateArticle(ctx){
        let data = ctx.request.body;
        if(data.id){
            const res = await ArticleModel.updateArticle(data);
            ctx.response.status = ServiceStatus.success.code;
            ctx.body = {
                code: ServiceStatus.success.code,
                msg: ServiceStatus.success.msg
            }
        }else{
            ctx.response.status = ServiceStatus.fail.code;
            ctx.body = {
                code: ServiceStatus.fail.code,
                msg: 'id为必选项'
            }
        }
    }
    /*
    * 删除文章 id
    * */
    static async deleteArticle(ctx){
        let data = ctx.request.body;

        if(!isNaN(data.id)){
            const res = await ArticleModel.deleteArticle(data);
            if(res){
                ctx.response.status = ServiceStatus.success.code;
                ctx.body = {
                    code: ServiceStatus.success.code,
                    msg: ServiceStatus.success.msg
                }
            }else{
                ctx.response.status = ServiceStatus.fail.code;
                ctx.body = {
                    code: ServiceStatus.fail.code,
                    msg: 'id不正确'
                }
            }

        }else{
            ctx.response.status = ServiceStatus.fail.code;
            ctx.body = {
                code: ServiceStatus.fail.code,
                msg: 'id为必选项'
            }
        }
    }
}

module.exports = articleController;

