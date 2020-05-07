const express = require('express');
const Post = require('./postDb');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  // do your magic!
Post.get()
  .then((users)=>{
    res.status(200).json(users);
  })
  .catch((err)=>{
    res.status(400).json({errorMessage:"there was an error."})
  })
});

router.get('/:id',validatePostId, (req, res) => {
//   // do your magic!
  res.status(200).json(req.post)
})

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

router.put('/:id', validatePostId, (req, res) => {
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

module.exports = router;
