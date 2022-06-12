
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('items',{
        id : {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : false
        },
        itemname : {
            type: Sequelize.STRING,
            allowNull : false
        },
        category : {
            type: Sequelize.STRING,
            allowNull : false
        },
        description1 : {
            type: Sequelize.STRING(600),
            allowNull : false
        },
        description2 : {
            type: Sequelize.STRING(600),
            allowNull : false
        },
        price : {
            type: Sequelize.STRING,
            allowNull : false
        },
        pic : {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull : false
        },
    }, {
        timestamps : false
    })
}
