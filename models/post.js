const mongoose=require('mongoose')

const postSchema= new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    /*
        images
    */
})

module.exports=mongoose.model('post', postSchema);