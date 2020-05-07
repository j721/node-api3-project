const express = require('express');
const router = express.Router();

const User = require('./userDb');
const Post = require("../posts/postDb");

router.use(express.json());

//POST request- add a new User
router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then((user)=>{
    res.status(201).json(user)
  })
  .catch((err)=>{
    res.status(400).json({errorMessage: "There was a problem adding the user."})
  })
});

//POST request - add a new post
router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
 Post.insert(req.body)
 .then((post)=>{
   res.status(201).json(post);
 })
.catch((err)=>{
  res.status(500).json({error: "sorry, there was a problem in adding your post."})
})
});

//GET request - get all the users
router.get('/' (req, res) => {
  // do your magic!
  User.get()
  .then((users)=>{
    res.status(200).json(users)
  })
  .catch((err)=>{
    res.status(500).json({error: "sorry, there was problem getting users."})
  })
});

//GET REQUEST - get user by id
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.get()
  .then(users=>{
    res.status(200).json(users)
  })
  .catch((err)=>{
    res.status(500).json({errorMessage: "error in retrieving array of users"})
  })
});

//GET request - get posts by user id
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const userId = req.params.id;
  User.getUserPosts(userId)
  .then((post)=>{
    res.status(200).json(post)
  })
.catch((err)=>{
  res.status(500).json({errorMessage: "sorry, error in getting post."})
})
});

//DELETE request- delete by user id
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((err)=>{
    res.status(500).json({errorMessage: "failed to remove item."})
  })
});

//PUT request - update user by id
router.put('/:id', validateUserId,validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params;
  User.update(id, req.body)
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((err)=>{
    res.status(500).json({errorMessage: "error in updating the user."})
  })
});


//custom middleware

// validates the user id on every request that expects a user id parameter
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

//validates the body on a request to create a new post
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
