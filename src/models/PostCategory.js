module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, 
  {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories'
   
  });
  
  PostCategory.associate = (model) => {
    model.Category.belongsToMany(model.BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'posts',
      through: PostCategory,
    });
    model.BlogPost.belongsToMany(model.Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
      through: PostCategory,
    });

}

return PostCategory;
}