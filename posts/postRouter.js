const express = require('express');
const Post = require('./postDb');
const router = express.Router();

router.use(express.json());

//GET REQUEST - gets an array of all the posts
router.get('/', (req, res) => {
  // do your magic!
Post.get()
  .then((users)=>{
    res.status(200).json(users);
  })
  .catch((err)=>{
    res.status(500).json({errorMessage:" error in retrieving posts data."})
  })
});

//GET request - get post by id
router.get('/:id',validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post)
})

//DELETE request- delete post by id
router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Post.remove(req.params.id)
  .then((post)=>{
    res.status(200).json(post)
  })
  .catch((err)=>{
    res.status(500).json({errorMessage: "error in removing post."})
  })
});

//PUT request- update post by id
router.put('/:id', validatePostId, validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Post.update(id, req.body)
  .then((post)=>{
    res.status(200).json(post)
  })
  .catch((err)=>{
    res.status(400).json({errorMessage: "sorry, there was a problem in updating the post."})
  })
});


// custom middleware
function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Post.getById(id)
  .then((post)=>{
    if(post){
      req.post = post;
      next();
    }else{
      res.status(404).json({errorMessage: "error in retrieving post"})
    }
  })
.catch((err)=>{
  res.status(500).json({errorMessage: "post information could not be retrieved."})
})
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({error: "missing post data." })
  }else if (!req.body.text){
    res.status(400).json({errorMessage:"missing required text field."})
  }else{
    next()
  }
}

module.exports = router;


/* if(!Object.keys(req.body).length){
  res.status(400).json({error: "missing pst data"})
} */