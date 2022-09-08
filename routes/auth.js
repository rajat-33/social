//this is the route for all auth endpoints

const express=require('express');
const User = require('../models/user');
const {body, validationResult}=require('express-validator'); //for validation

const router=express.Router();
router.post('/',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password length is too short').isLength({min: 5})
],(req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors)
    }
    console.log(req.body);
    const newUser=User(req.body);
    newUser.save();
    res.send(req.body);
})

module.exports = router;