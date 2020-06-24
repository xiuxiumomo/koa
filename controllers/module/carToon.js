

let { carToonCategory, carToonBase } = require('../../thirdApi/carToon/index');
var BaseController = require('../BaseController');
class CarToonController {
    /**
     * 获取分类
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async carToonCategory(ctx) {
     
        let { mhlb,page } = ctx.query;
        console.log(mhlb,page)
        
        if (mhlb!='') {
            try {
                // 查询电影
                let { list = [], code = 0 } = await carToonCategory({ mhlb,page });
                console.log(code,list)
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
            let res = await BaseController.fail({ code: 416, msg: '漫画分类名称有误~' })
            ctx.body = {
                ...res
            }
        }
    }
    /**
     * 搜索
     * 
     * @param {*} ctx 
     */
    static async carToonSearch(ctx) {
        let { mhname } = ctx.query;
        if (!mhname) {
            let res = await BaseController.fail({ code: 416, msg: '漫画名称必填~' })
            ctx.body = {
                ...res
            }
            return;
        }
        try {
            let { code = 0, list = []} = await carToonBase({ mhname });
           
            if (code == 0) {
                let res = BaseController.success({ list })
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


module.exports = CarToonController;

