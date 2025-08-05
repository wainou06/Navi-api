const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            name: {
               type: Sequelize.STRING(50),
               allowNull: false,
            },
            nick: {
               type: Sequelize.STRING(255),
               allowNull: false,
               unique: true,
            },
            password: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            phone: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            address: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
            role: {
               type: Sequelize.ENUM('ADMIN', 'USER'),
               allowNull: false,
               defaultValue: 'USER', // 기본 값은 'USER'로 설정
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      User.hasMany(db.Order, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE' })
      User.hasMany(db.RentalOrder, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE' })
   }
}
