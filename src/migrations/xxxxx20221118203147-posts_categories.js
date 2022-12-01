'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('posts_categories', { 
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'blog_posts',
          key: 'id',
        },
      },
      category_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        }
      },
    }).then(() => {
      return queryInterface.addConstraint('posts_categories', {
        fields: ['post_id', 'category_id'], 
        type: 'primary key',
        name: 'pk_posts_categories'
      });
    });
    
  },

  down: async (queryInterface, _Sequelize) => {
     await queryInterface.dropTable('posts_categories');
  }
};
