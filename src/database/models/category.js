module.exports = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define('Category', {
    id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    underscored: true,
    timestamps: false,
  });
  
  return CategoriesTable;
};