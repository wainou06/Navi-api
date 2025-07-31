const Sequelize = require('sequelize')

module.exports = class Ratings extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            rating: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            comment: {
               type: Sequelize.TEXT,
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Rating',
            tableName: 'ratings',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {}
}
