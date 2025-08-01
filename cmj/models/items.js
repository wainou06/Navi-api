const Sequelize = require('sequelize')

module.exports = class Items extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            price: {
               type: Sequelize.NUMBER,
               allowNull: false,
            },
            stockNumber: {
               type: Sequelize.NUMBER,
               allowNull: false,
            },
            itemSellStatus: {
               type: Sequelize.ENUM('SELL', 'SOLD_OUT', 'ON_SALE'),
               allowNull: false,
            },
            itemDetail: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Item',
            tableName: 'Items',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {}
}
