const Sequelize = require('sequelize')
const env = 'development'
const config = require('../config/config.json')[env]

const Img = require('./img')
const Item = require('./item')
const Keyword = require('./keyword.js')
const Order = require('./order')
const Rating = require('./rating')
const RentalImg = require('./rentalImg.js')
const RentalItem = require('./rentalItem')
const RentalOrder = require('./rentalOrder')
const Statistic = require('./statistic.js')
const User = require('./user.js')
const ItemKeyword = require('./itemKeyword.js')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Img = Img
db.Item = Item
db.Keyword = Keyword
db.Order = Order
db.Rating = Rating
db.RentalImg = RentalImg
db.RentalItem = RentalItem
db.RentalOrder = RentalOrder
db.Statistic = Statistic
db.User = User
db.ItemKeyword = ItemKeyword

Img.init(sequelize)
Item.init(sequelize)
Keyword.init(sequelize)
Order.init(sequelize)
Rating.init(sequelize)
RentalImg.init(sequelize)
RentalItem.init(sequelize)
RentalOrder.init(sequelize)
Statistic.init(sequelize)
User.init(sequelize)
ItemKeyword.init(sequelize)

Img.associate(db)
Item.associate(db)
Keyword.associate(db)
Order.associate(db)
Rating.associate(db)
RentalImg.associate(db)
RentalItem.associate(db)
RentalOrder.associate(db)
Statistic.associate(db)
User.associate(db)
ItemKeyword.associate(db)

module.exports = db
