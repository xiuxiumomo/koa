function addRoutes(router) {
    let that = this;
    return Object.keys(router).forEach((keyName)=>{
        that.use(router[keyName].routes(),router[keyName].allowedMethods());
    })
}
module.exports = {
    addRoutes
}