module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    
}, 
{
  timestamps: false,
  underscored: true,
  tableName: 'users'
});
User.associate = (model) => {
  User.hasMany(model.BlogPost, {
    as: 'posts',
    foreignkey: 'userId'
  });
}

return User;
}

