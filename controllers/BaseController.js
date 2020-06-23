var BaseController = {
    success: function(params={}) {
        return {
            code: 200,
            msg: '成功~',
            ...params

        }
    },
    fail: function(params={}) {
        return {
            code: 400,
            msg: '请求失败~',
            ...params
        }
        
    }
}

module.exports = BaseController;