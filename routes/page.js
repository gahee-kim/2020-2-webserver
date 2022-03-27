const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Todo } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입' });
});

router.get('/profile', isLoggedIn, async (req, res, next) => {
  try {
    const info = await Todo.findAll({
      where: { UserId: req.user.id },
      include: {
        model: User,
        attributes: ['id'],
      },
    });
    res.render('profile', {
      title: 'my information',
      twits: info,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const todo = await Todo.findAll({
      include: {
        model: User,
        attributes: ['id', 'name'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('todo', {
      title: 'TO-DO-LIST',
      twits: todo,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
