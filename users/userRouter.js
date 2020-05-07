const express = require('express');
const router = express.Router();

const User = require('./userDb');
const Post = require("../posts/postDb");

router.use(express.json());

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
  const { id } = req.params;
  User.getById(id)
  .then((user)=>{
    if(user){
      req.user = user;
      next();
    }else{
      res.status(400).json({message: "invalid user id"})
    }
  })
}

//validates the body on a request to create a new user
function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing user data" })
  }else if(!req.body.name){
    res.status(400).json({message: "missing required name field."})
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({message: "missing post data" })
  }else if(!req.body.text){
    res.status(400).json({message: "missing required text field"})
  }else{
    next();
  }
}

module.exports = router;
