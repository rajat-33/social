//this is the route for all auth endpoints

const express=require('express');
const User = require('../models/user');
const {body, validationResult}=require('express-validator'); //for validation
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser=require('../middlewares/fetchuser')

const JWT_SECRET="HelloGoogleThisIsASecret"


//Signup Endpoint - No Authentication Required
const router=express.Router();

router.post('/signup',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length is too short').isLength({min: 5})
], async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors)
    }
    
    const salt = await bcrypt.genSaltSync(10);
    const securePassword = await bcrypt.hashSync(req.body.password, salt);

    const newUser= await User.create({
        password: securePassword,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        nearby: req.body.nearby
    });
    newUser.save();
    res.send(newUser);
})


//login Endpoint - No Authentication Required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length is too short').isLength({min: 5})
], async (req, res)=>{
    
    let sucess=false;
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors)
    }
    
    const {email, password}=req.body;

    let user=  await User.findOne({email})
    if(!user)
    {
        return res.status(400).json({sucess, error:"Incorrect Email/Password"});
    }
    
    const passwordCompare= await bcrypt.compare(password, user.password);
    if(!passwordCompare)
    {
        return res.status(400).json({sucess, error:"Incorrect Email/Password"});
    }
    const data= await {
        user:{
            id: user.id
        }
    }

    const authToken= jwt.sign(data, JWT_SECRET);

    sucess=true;
    res.send({authToken});

})


//getuser Endpoint - Authentication Required
router.post('/getuser', fetchuser, async (req, res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal Server Error!");
    }
})



module.exports = router;