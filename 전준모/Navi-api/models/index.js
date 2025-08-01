const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const User = require('./user')
const Order = require('./orders')
const RentalOrder = require('./rentalOrders')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.User = User
db.Order = Order
db.RentalOrder = RentalOrder

User.init(sequelize)
Order.init(sequelize)
RentalOrder.init(sequelize)

User.associate(db)
Order.associate(db)
RentalOrder.associate(db)

module.exports = db
