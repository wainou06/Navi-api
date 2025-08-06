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
            // password와 같은 이유로 수정
            nick: {
               type: Sequelize.STRING(255),
               allowNull: true,
               unique: true,
            },
            // 구글 연동을 위해 true로 수정
            password: {
               type: Sequelize.STRING(255),
               allowNull: true,
            },
            // password와 같은 이유로 수정
            phone: {
               type: Sequelize.STRING(255),
               allowNull: true,
            },
            // password와 같은 이유로 수정
            address: {
               type: Sequelize.STRING(255),
               allowNull: true,
            },
            role: {
               type: Sequelize.ENUM('MANAGER', 'USER'),
               allowNull: false,
               defaultValue: 'USER',
            },
            // 구글 아이디 컬럼 추가 (일반 유저를 위한 null 허용)
            googleId: {
               type: Sequelize.STRING(255),
               allowNull: true,
               unique: true,
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
