//This is the route for all endpoints related to posts

const express=require('express')
const router=express.Router();
const Post=require("../models/post.js")
const {body, validationResult}=require('express-validator'); //for validation

router.post('/createpost', (req, res)=>{
    const newPost=Post(req.body);
    newPost.save();
    res.send(req.body);
})

module.exports = router;