const Sequelize = require ('sequelize')

const sequelize = new Sequelize('shop', 'postgres', 'postgres', {
    dialect: "postgresql",
    host: "89.108.98.228"
})
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Items = require("./Items")(sequelize, Sequelize);

module.exports = db
