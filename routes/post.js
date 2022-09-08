const express=require('express')
const router=express.Router();

router.post('/',(req, res)=>{
    res.send({"name": "rajat", "class":"posts"});
})

module.exports = router;