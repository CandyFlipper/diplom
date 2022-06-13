const db = require("../db");
const {Op} = require("sequelize");

module.exports = class ItemsService {
    static getAll (options) {
        return db.Items.findAll(options)
    }
    static getById (id = 1) {
        return db.Items.findOne({
            where: {
                id
            }
        })
    }
    static getByCategory (category) {
        return db.Items.findAll({
            where: {
                category
            }
        })
    }
    static getCategory() {
        return db.Items.findAll({
            attributes: ['category'],
            group: ['category']
        })
    }
    static getByName (name) {
        return db.Items.findAll({
            where: {
                itemname: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
    }
    static getForMain () {
        return db.Items.findAll({
            limit: 4
        })
    }
}
