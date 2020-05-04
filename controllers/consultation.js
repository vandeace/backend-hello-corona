const { Consultation, User } = require('../models');
const consultParams = {
  include: [
    {
      model: User,
      attributes: ['id', 'username'],
    },
  ],
  attributes: { exclude: ['updatedAt', 'UserId'] },
};

exports.create = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    if (req.user.status === 'patient') {
      const newConsult = await Consultation.create(req.body);
      const consult = await Consultation.findOne({
        ...consultParams,
        where: { id: newConsult.id },
      });
      res.status(200).send({ data: consult, status: 'success' });
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to create consultation!' });
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    if (req.user.status === 'doctor') {
      await Consultation.update(req.body, {
        where: { id: req.params.id },
      });
      const consult = await Consultation.findOne({
        ...consultParams,
        where: { id: req.params.id },
      });
      res.status(200).send({ data: consult });
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).send({ message: 'you failed to update data' });
    console.log(error);
  }
};

exports.index = async (req, res) => {
  try {
    id = req.user.id;
    if (req.user.status === 'doctor') {
      const consult = await Consultation.findAll({
        ...consultParams,
      });
      res.status(200).send({ data: consult });
    } else {
      const consult = await Consultation.findAll({
        ...consultParams,
        where: { userId: id },
      });
      res.status(200).send({ data: consult });
    }
  } catch (error) {
    res.status(500).send({ message: 'you failed to update data' });
    console.log(error);
  }
};
