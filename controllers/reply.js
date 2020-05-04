const { Reply, Consultation } = require('../models');

exports.create = async (req, res) => {
  try {
    if (req.user.status === 'doctor') {
      const consultId = req.body.consultationId;
      req.body.consultationId = req.params.id;
      console.log(consultId);
      await Consultation.update(
        { status: 'Waiting Live Consultation' },
        { where: { id: req.params.id } }
      );
      await Reply.create(req.body);
      const reply = await Reply.findOne({
        include: [
          {
            model: Consultation,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'userId', 'UserId'],
            },
          },
        ],
        where: { id: req.params.id },
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'consultationId',
            'ConsultationId',
          ],
        },
      });

      res.status(200).send({ data: reply });
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to create reply' });
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    // const consultId = req.body.consultationId;
    const reply = await Reply.findAll({
      // where: { id: req.params.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ConsultationId'],
      },
    });
    res.status(200).send({ data: reply });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create reply' });
    console.log(error);
  }
};
