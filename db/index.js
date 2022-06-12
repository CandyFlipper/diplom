const Sequelize = require ('sequelize')

const sequelize = new Sequelize('shop, 'postgresql', 'admin', {
    dialect: "postgresql",
    host: "localhost"
})

const Items = require('./Items')(sequelize);

module.exports = {
    sequelize : sequelize,
    items : Items
}