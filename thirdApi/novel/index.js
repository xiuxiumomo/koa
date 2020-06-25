let { service } = require('../../utils/request');
let { baseApi } = require('../../config/third/index');
function novelBase(params = {}) {
    return service({
        method: 'get',
        url: `${baseApi}/`,
        params
    })
}


module.exports = {
    novelBase
}