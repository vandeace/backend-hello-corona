const { Article, User } = require('../models');
const { Op } = require('sequelize');

exports.create = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    console.log(req.body.userId);
    if (req.user.status === 'doctor') {
      const newArticle = await Article.create(req.body);
      const article = await Article.findOne({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'status'],
          },
        ],
        where: { id: newArticle.id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'UserId', 'userId'] },
      });
      res.status(200).send({ data: article });
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to create article' });
    console.log(error);
  }
};

exports.index = async (req, res) => {
  const NOW = new Date();
  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  try {
    const article = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'id', 'status'],
        },
      ],
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
      attributes: { exclude: ['updatedAt', 'UserId', 'userId'] },
    });
    res.status(200).send({ data: article });
  } catch (error) {
    res.status(500).send({ message: 'Failed to Show Houses!' });
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const article = await Article.findOne({
      include: [
        {
          model: User,
          attributes: ['username', 'id', 'status'],
        },
      ],
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ['updatedAt', 'UserId', 'userId'] },
    });
    res.status(200).send({ data: article });
  } catch (error) {
    res.status(500).send({ message: 'Failed to Show Houses!' });
    console.log(error);
  }
};
