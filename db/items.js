const sequelize = require('sequelize')
const Sequelize = require ('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('items',{
        id : {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        itemname : {
            type: Sequelize.VARCHAR,
            allowNull : false
        },
        category : {
            type: Sequelize.VARCHAR,
            allowNull : false
        },
        description1 : {
            type: Sequelize.VARCHAR,
            allowNull : false
        },
        description2 : {
            type: Sequelize.VARCHAR,
            allowNull : false
        },
        price : {
            type: Sequelize.VARCHAR,
            allowNull : false
        },
        pic : {
            type: Sequelize.JSON,
            allowNull : false
        },
    }, {
        timestamps : false
    })
}