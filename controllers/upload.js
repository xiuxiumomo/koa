
var BaseController = require('./BaseController');
var qnConfig = require('../config/qnConfig');
const fs = require('fs');
const qn = require('qn');
const path = require('path');
function resolve(dirName) {
    return path.join(__dirname, dirName, '/')
}
// 七牛云
const client = qn.create({
    ...qnConfig
})
async function getResData({ filePath = '', dataBuffer = '', fileName = '' } = {}) {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(filePath, dataBuffer, function (err) {
                if (err) {
                    let res = BaseController.fail({ code: 102, msg: '写入文件失败~' })
                    resolve({
                        ...res
                    })
                    return false

                } else {
                    client.uploadFile(filePath, { key: `/koa/upload/${fileName}` }, function (err1, result) {
                        if (result) {
                            let res = BaseController.success({
                                msg: '上传成功~',
                                url: result.url,
                                data: result,
                            })
                            resolve({
                                ...res
                            })
                        } else {
                            let res = BaseController.fail({
                                msg: '上传错误~',
                                err: err1
                            })
                            reject({...res})
                        }

                        // 上传之后删除本地文件
                        fs.unlinkSync(filePath);
                        return false;
                    });
                }
            })
        } catch (err) {
            let rData =  BaseController.fail({ msg: '错误~', err })
            resolve({...rData})
        }
    })
}
class UploadController {

    /**
     * 上传文件
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async index(ctx) {
        let { img, name } = ctx.request.body;
        var fileName = Date.now() + name;
        // 构建图片路径
        var filePath = resolve('images') + fileName;
        console.log(filePath)
        // 过滤data:URL
        var base64Data = img.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = Buffer.from(base64Data, 'base64');
        let res = await getResData({filePath,fileName,dataBuffer});
        ctx.body = {
            ...res
        }
    }
}


module.exports = UploadController;



