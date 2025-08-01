const Sequelize = require('sequelize')

module.exports = class RentalOrder extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            orderStatus: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            userId: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: 'Users',
                  key: 'id',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'RentalOrder',
            tableName: 'RentalOrders',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      // RentalOrder -> User (N:1)
      db.RentalOrder.belongsTo(db.User, {
         foreignKey: 'userId',
         targetKey: 'id',
         as: 'user',
      })

      // RentalOrder -> RentalItem (1:N)
      db.RentalOrder.hasMany(db.RentalItem, {
         foreignKey: 'rentalOrderId',
         sourceKey: 'id',
         as: 'rentalItems',
      })
      db.RentalOrder.hasMany(db.Rating, {
         foreignKey: 'rentalOrderId',
         sourceKey: 'id',
         as: 'ratings',
      })
   }
}
