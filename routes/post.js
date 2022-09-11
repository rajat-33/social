//This is the route for all endpoints related to posts

const express=require('express')
const router=express.Router();
const Post=require("../models/post.js")
const fetchuser=require('../middlewares/fetchuser')

//Endpoint to create a post: Authentication required
router.post('/createpost', fetchuser, async (req, res)=>{
    try
    {
        const userId = req.user.id;
        const newPost= await Post.create({
            user: userId,
            title: req.body.title,
            description: req.body.description,
            address: req.body.address,
            pincode: req.body.pincode,
            city: req.body.city
        })
        newPost.save();
        res.send(req.body);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

//Endpoint to get all posts of a user: Authentication required
router.post('/getpost', fetchuser, async (req, res)=>{
    try
    {
        const userId = req.user.id;
        const allPosts = await Post.find({user: userId});
        res.send(allPosts);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Internal Server Error");
    } 
})


//Endpoint to update a post: Authentication required
router.put('/updatepost/:id', fetchuser, async (req, res)=>{
    const {title, description, address, pincode, city}=req.body;
    
    try{
        //create a new post object
        const newPost={};
        if(title)
        {
            newPost.title=title;
        }
        if(description)
        {
            newPost.description=description;
        }
        if(address)
        {
            newPost.address=address;
        }
        if(pincode)
        {
            newPost.pincode=pincode;
        }
        if(city)
        {
            newPost.city=city;
        }
        //find the post to be updated 
        let post = await Post.findById(req.params.id);
        if(!post)
        {
            res.status(404).send("Not found");
        }

        //verifying whether the user logged in is the only one to update a post
        if(post.user.toString()!==req.user.id)
        {
            return res.status(401).send("Not Allowed")
        }
        post=await Post.findByIdAndUpdate(req.params.id, {$set: newPost}, {new: true});
        res.json({post});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//Endpoint to delete a post: Authentication required
router.delete('/deletepost/:id', fetchuser, async (req, res) => {
    try
    {
        //find the note to be deleted
        let post=await Post.findById(req.params.id);
        if(!post)
        {
            res.status(404).send("Not found");
        }

        //verifying whether the user logged in is the only one to delete a note
        if(post.user.toString()!==req.user.id)
        {
            return res.status(401).send("Not Allowed")
        }
        
        post=await Post.findByIdAndDelete(req.params.id);
        res.json("sucess note has been deleted")
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;