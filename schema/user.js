const moment = require('moment');
function User(sequelize,DataTypes){
    let obj = sequelize.define('user',{
            //id
            id: {
                type: DataTypes.INTEGER, // 数字类型
                primaryKey: true, //是否为主键
                allowNull: true, //是否为空
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name',
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'email',
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password',
            },
            // 创建时间
            createdAt: {
                type: DataTypes.DATE,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            // 更新时间
            updatedAt: {
                type: DataTypes.DATE,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        },
        {
            freezeTableName: true
        })
    return obj;
}
module.exports =  User;
