const express = require('express');

const User = require('./userDb');
const Post = require("../posts/postDb");
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!

  User.insert(req.body)
  .then((user)=>{
    res.status(201).json(user)
  })
  .catch((err)=>{
    res.status(400).json({errorMessage: "There was a problem adding the user."})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
