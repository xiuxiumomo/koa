

let { movieSearch, movieBase } = require('../../thirdApi/movie/index');
var BaseController = require('../BaseController');
class MovieController {
    /**
     * 搜索电影
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async movieSearch(ctx) {
        let { ysname } = ctx.query;
        if (ysname) {
            try {
                // 查询电影
                let { list = [], code = 0 } = await movieSearch({ ysname });
                if (code == 0) {
                    let res = BaseController.success({ list })
                    ctx.body = {
                        ...res
                    }
                }
            } catch (err) {
                let res = BaseController.fail({ err })
                ctx.body = {
                    ...res
                }
            }
        } else {
            let res = await BaseController.fail({ code: 416, msg: '电影名关键字不能为空' })
            ctx.body = {
                ...res
            }
        }
    }
    /**
     * 获取电影详情
     * 
     * @param {*} ctx 
     */
    static async movieDetail(ctx) {
        let { ysurl } = ctx.query;
        if (!ysurl) {
            let res = await BaseController.fail({ code: 416, msg: '详情路径必填~' })
            ctx.body = {
                ...res
            }
            return;
        }
        try {
            let { code = 0, list = {}, data = {} } = await movieBase({ ysurl });
            if (code == 0) {
                let res = BaseController.success({ data, list })
                ctx.body = {
                    ...res
                }
            }
        }catch(e){
            let res = await BaseController.fail({ code: 500, msg: '请求错误~' })
            ctx.body = {
                ...res
            }
        }
        
    }


}


module.exports = MovieController;

