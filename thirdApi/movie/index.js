let { service } = require('../../utils/request');
let { baseApi } = require('../../config/third/index');
function movieBase(params = {}) {
    return service({
        method: 'get',
        url: `${baseApi}/`,
        params
    })
}
function movieSearch(params = {}) {
    return service({
        method: 'get',
        url: `${baseApi}/`,
        params
    })
}
function movieDetail(params = {}) {
    return service({
        method: 'get',
        url: `${baseApi}/`,
        params
    })
}
module.exports = {
    movieSearch,
    movieDetail,
    movieBase
}