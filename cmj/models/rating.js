const Sequelize = require('sequelize')

module.exports = class Rating extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            rating: {
               type: Sequelize.NUMBER,
               allowNull: false,
            },
            comment: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Rating',
            tableName: 'Ratings',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {}
}
