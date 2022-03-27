const express = require('express');
const { Todo } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async(req, res, next) => {
  try {
    await Todo.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Todo.destroy({ where: { id: req.params.id, UserId: req.user.id } });
    res.send('OK');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    await Todo.update({
      content: req.body.content,
    }, {
      where: { id: req.params.id },
    });
    res.send('OK');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:id/check/todo', async (req, res, next) => {
  try {
    await Todo.update({
      check: req.body.check,
    }, {
      where: { id: req.params.id },
    });
    res.send('OK');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:id/check/done', async (req, res, next) => {
  try {
    await Todo.update({
      check: req.body.check,
    }, {
      where: { id: req.params.id },
    });
    res.send('OK');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
