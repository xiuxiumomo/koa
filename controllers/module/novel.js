

let {  novelBase } = require('../../thirdApi/novel/index');
var BaseController = require('../BaseController');
class novelController {
    /**
     * 搜索小说
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async novelSearch(ctx) {
        let { xsname } = ctx.query;
       
        if (xsname) {
            try {
                let { list = [], code = 0 } = await novelBase({ xsname });
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
            let res = await BaseController.fail({ code: 416, msg: '小说名字不能为空~' })
            ctx.body = {
                ...res
            }
        }
    }
    /**
     * 获取小说信息详情
     * 
     * @param {*} ctx 
     */
    static async novelDetail(ctx) {
        let { xsurl1 } = ctx.query;
        if (!xsurl1) {
            let res = await BaseController.fail({ code: 416, msg: '详情路径必填~' })
            ctx.body = {
                ...res
            }
            return;
        }
        try {
            let { code = 0, list = {}, data = {} } = await novelBase({ xsurl1});
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
    /**
     * 获取小说内容详情
     * 
     */
    static async novelChapterDetail(ctx) {
        let { xsurl2 } = ctx.query;
        if (!xsurl2) {
            let res = await BaseController.fail({ code: 416, msg: '详情路径必填~' })
            ctx.body = {
                ...res
            }
            return;
        }
        try {
            let { code = 0, content=[] } = await novelBase({ xsurl2 });
            if (code == 0) {
                let res = BaseController.success({ data: content })
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


module.exports = novelController;

