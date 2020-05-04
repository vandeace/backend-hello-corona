const { User } = require('../models');

exports.show = async (req, res) => {
  try {
    const users = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).send({ data: users, status: 'success' });
  } catch (error) {
    res.status(500).send({ message: 'CANT FIND THE USER  ' });
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.user.id } });
    const users = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).send({ data: users });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'CANT UPDATE THE USER CHECK YOUR METHOD ' });
    console.log(error);
  }
};

exports.destroy = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.user.id } });
    res.status(200).send({ status: 'succes delete user' });
  } catch (error) {
    console.log(error);
  }
};
