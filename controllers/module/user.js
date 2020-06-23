const UserModel = require('../../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');

const ServiceStatus = require('../status.config');
let successCode = ServiceStatus.success.code;
let successMsg = ServiceStatus.success.msg;
let failCode = ServiceStatus.fail.code;
let failMsg = ServiceStatus.fail.msg;

class userController {
    /**
     * 创建
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;

        if (req.name     //用户名
            && req.email //邮箱
            && req.password // 密码
        ) {
            try {
                // 创建文章模型
                const ret = await UserModel.createData(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await UserModel.getData(ret.id);
                ctx.response.status = successCode;
                ctx.body = {
                    code: successCode,
                    msg: '创建用户成功',
                    data
                }

            } catch (err) {
                ctx.response.status = failCode;
                ctx.body = {
                    code: failCode,
                    msg: '创建用户失败',
                    err
                }
            }
        } else {
            ctx.response.status = failCode;
            ctx.body = {
                code: failCode,
                msg: '参数不齐全',
            }
        }

    }
    /*
    * 用户登录
    * */
    static async login(ctx){
        let data = ctx.request.body;
        if(data.name && data.password){
            //手动建立token
            const userToken = {
                name: data.name,
                email: data.email,
            }
            const token = jwt.sign(userToken, secret.sign, {expiresIn: '7day'});
            try{
                let res = await UserModel.checkData(data);
                ctx.response.status = successCode;
                ctx.body = {
                    code: successCode,
                    msg: '登录成功',
                    token
                }

            }catch (err) {
                ctx.response.status = failCode;
                ctx.body = {
                    code: failCode,
                    msg: '登录失败',
                    err

                }
            }
        }else{
            ctx.response.status = failCode;
            ctx.body = {
                code: failCode,
                msg: '用户名或密码错误'
            }
        }
    }

    /**
     * 获取用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询详情
                let data = await UserModel.getData(id);
                ctx.response.status = successCode;
                ctx.body = {
                    code: successCode,
                    msg: successMsg,
                    data
                }

            } catch (err) {
                ctx.response.status = failCode;
                ctx.body = {
                    code: failCode,
                    msg: failMsg,
                    err
                }
            }
        } else {
            ctx.response.status = failCode;
            ctx.body = {
                code: failCode,
                msg: '用户id必须传'
            }
        }
    }

    /*
    * 查询列表
    * page  分页数
    * limit 每页数
    *
    * */
    static async getList(ctx){
        let param = ctx.request.body;
        try {
            let data = await UserModel.getAllList(param);
            ctx.response.status = successCode;
            ctx.body = {
                code: successCode,
                msg: successMsg,
                data
            }
        } catch (err) {
            ctx.response.status = failCode;
            ctx.body = {
                code: failCode,
                msg: failMsg,
                err

            }
        }
    }
    /*
    * 修改文章
    * */
    static async updateData(ctx){
        let data = ctx.request.body;
        if(data.id){
            try{
                const res = await UserModel.updateData(data);
                ctx.response.status = successCode;
                ctx.body = {
                    code: successCode,
                    msg: successMsg
                }
            }catch (err) {
                ctx.response.status = failCode;
                ctx.body = {
                    code: failCode,
                    msg: failMsg,
                    err
                }
            }

        }else{
            ctx.response.status = failCode;
            ctx.body = {
                code: failMsg,
                msg: 'id为必选项'
            }
        }
    }
    /*
    * 删除 id
    * */
    static async deleteData(ctx){
        let data = ctx.request.body;

        if(!isNaN(data.id)){

            try{
                let res = await UserModel.deleteData(data);
                ctx.response.status = successCode;
                ctx.body = {
                    code: successCode,
                    msg: successMsg
                }
            }catch (err) {
                ctx.response.status = failCode;
                ctx.body = {
                    code: failCode,
                    msg: failMsg,
                    err
                }
            }

        }else{
            ctx.response.status = failCode;
            ctx.body = {
                code: failMsg,
                msg: 'id为必选项'
            }
        }
    }
}

module.exports = userController;

