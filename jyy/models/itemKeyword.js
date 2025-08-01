const Sequelize = require('sequelize')

module.exports = class ItemKeyword extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            itemId: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: 'Items',
                  key: 'id',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
               },
            },
            keywordId: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: 'Keywords',
                  key: 'id',
               },
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'ItemKeyword',
            tableName: 'ItemKeywords',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {}
}
