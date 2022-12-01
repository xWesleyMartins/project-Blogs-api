module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'users',
      //   key: 'id',
      // },
      foreignKey: true,
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, 
  {
    timestamps: true,
    tableName: 'blog_posts',
    underscored: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }

return BlogPost;
}