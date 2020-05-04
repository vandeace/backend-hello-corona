const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth');
const {
  create: createArticle,
  index: indexArticle,
  show: showArticle,
} = require('../controllers/article');
const {
  show: showUser,
  update: updateUser,
  destroy: deleteUser,
} = require('../controllers/user');
const {
  create: createConsult,
  update: updateConsult,
  index: showAll,
} = require('../controllers/consultation');
const {
  create: createReply,
  show: showReply,
} = require('../controllers/reply');
//========MIDDLEWARE=======================
const { protected } = require('../middlewares/auth');

//========USER ACTION=======================
router.post('/login', login);
router.post('/register', register);
router.get('/user', protected, showUser);
router.patch('/user', protected, updateUser);
router.delete('/user', protected, deleteUser);

//========ARTICLE ACTION=======================
router.post('/article', protected, createArticle);
router.get('/article', indexArticle);
router.get('/article/:id', showArticle);

//========CONSULT ACTION=======================
router.post('/consultation', protected, createConsult);
router.patch('/consultation/:id', protected, updateConsult);
router.get('/index', protected, showAll);

//========REPLY ACTION=======================
router.post('/consultation/:id/reply', protected, createReply);
// router.get('/reply/:id/', protected, showReply);
router.get('/reply', protected, showReply);
module.exports = router;
