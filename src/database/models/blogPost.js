module.exports = (sequelize, DataTypes) => {
  const BlogpostsTable = sequelize.define('BlogPost', {
    id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'BlogPosts',
    timestamps: false,
  });

  BlogpostsTable.associate = (models) => {
    BlogpostsTable.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };
  
  return BlogpostsTable;
};
 