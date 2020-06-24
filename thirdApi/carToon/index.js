let { service } = require('../../utils/request');
let { baseApi } = require('../../config/third/index');
/**
 * 
@params 参数 mhlb只能是以下几个

少年热血 > shaonianrexue
武侠格斗 > wuxiagedou
恐怖灵异 > kongbulingyi
耽美人生 > danmeirensheng
少女爱情 > shaonvaiqing
恋爱生活 > lianaishenghuo
生活漫画 > shenghuomanhua
科幻魔幻 > kehuanmohuan
竞技体育 > jingjitiyu
爆笑喜剧 > baoxiaoxiju
侦探推理 > zhentantuili
最新更新 > new
热门排行 > hot
已完结 > wanjie
连载中 > lianzai
大陆漫画 > dalu
日本漫画 > riben
韩国漫画 > hanguo
香港漫画 > xianggang
台湾漫画 > taiwan
欧美漫画 > oumei
其他漫画 > qita
 */
//获取分类
function carToonCategory(params = {}) {
  let { mhlb = 'new', page = 1 } = params

  return service({
    method: 'get',
    url: `${baseApi}/?mhlb=${mhlb}-${page}`,
  })
}
//获取漫画列表
function carToonSearch(params = {}) {
  return service({
    method: 'get',
    url: `${baseApi}/`,
    params
  })
}
//漫画base
function carToonBase(params = {}) {
  return service({
    method: 'get',
    url: `${baseApi}/`,
    params
  })
}

module.exports = {
  carToonCategory,
  carToonSearch,
  carToonBase
}