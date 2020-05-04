const jwt = require('jsonwebtoken');
const { User } = require('../models');

//make authentication
exports.protected = async (req, res, next) => {
  try {
    //first make token from req header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      //if token get make it to string
      const data = jwt.verify(token, process.env.JWT_SECRET);
      //verify token with secret key string
      //first search user is there user with id parameter
      const user = await User.findOne({ where: { id: data.id } });
      if (!user) {
        //if user not found send error message
        res.status(403).send({ message: 'Forbidden Request' });
      } else {
        //if user available send user id and token
        req.user = user;
        req.token = token;
        //then user next function to continue the request route
        next();
      }
    } else {
      res.status(401).send({ message: "you're unauthorized" });
    }
  } catch (error) {}
};
