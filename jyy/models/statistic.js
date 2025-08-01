const Sequelize = require('sequelize')

module.exports = class Statistic extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            request: {
               type: Sequelize.STRING(255),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Statistic',
            tableName: 'Statistics',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {}
}
