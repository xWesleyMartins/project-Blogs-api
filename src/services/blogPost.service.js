require('dotenv/config');
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
// const validation = require('../ultils/jwtValidations');

const { User, BlogPost, PostCategory, Category } = require('../models');

const createBlogPost = async (title, content, categoryIds, id) => {
  const t = await sequelize.transaction();
  try {
    const blogPost = await BlogPost.create({
      title, content, userId: id,
    }, { transaction: t });
    console.log(blogPost.id, 'asocmaosmcaomscomasomcaocansdipansdipoasndinasmc');
    await PostCategory.bulkCreate([
      { postId: blogPost.id, categoryId: categoryIds[0] },
      { postId: blogPost.id, categoryId: categoryIds[1] },
    ], { transaction: t });
    await t.commit();
    return blogPost;
  } catch (error) {
    await t.rollback();
    return error;
  }
  };

  const getByCategoryId = async (categoryId) => {
    const getCatId = await Promise.all(categoryId.map(async (mapId) => {
      const reResult = await Category.findByPk(mapId);
      if (!reResult) return true;
      return false;
    }));
  return getCatId;
};

const getAllPosts = async () => {
  const getAll = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    }, {
      model: Category,
      as: 'categories',
    }], 
  });
  return getAll;
};

const getByid = async (id) => {
  const getId = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    }, {
      model: Category,
      as: 'categories',
    }], 
  });
  return getId;
};
const deleteById = (id) => BlogPost.destroy({ where: { id } });

// const updatPost = async (id, objput) => {
//   const result = await BlogPost.update({
//     title: objput.title,
//     content: objput.content,
//   }, { where: { id } });
//   return result;
// };

module.exports = { createBlogPost, getByCategoryId, getAllPosts, getByid, deleteById };