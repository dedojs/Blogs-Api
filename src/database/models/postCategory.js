module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize. define('PostCategory', {
    postId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  },{
    underscore: true,
    timestamps: false
  });

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }

  return PostCategories;
};

