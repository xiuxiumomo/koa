const Sequelize = require('sequelize');
const config = require('../config');
const { dbName,
        dbUserName,
        dbPassWord,
        dbIP } = config;
        console.log(config)
const sequelize = new Sequelize(dbName, dbUserName, dbPassWord, {
    host: dbIP,
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        // 字符集
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

//导出一个sequelize对象
module.exports = {
    sequelize
};

