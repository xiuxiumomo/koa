const router = require('../base');
const UserController = require('../../controllers/module/user'); //用户
/**
 * 用户
 * */
//注册
router.post('/user/register',UserController.create);
//登录
router.post('/user/login',UserController.login);
//获取用户详情
router.get('/user/:id',UserController.detail);
//获取用户列表
router.post('/user/getList', UserController.getList);
//修改用户
router.post('/user/update', UserController.updateData);
//删除用户
router.post('/user/delete',UserController.deleteData);

module.exports = router;