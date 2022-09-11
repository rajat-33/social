const mongoose=require('mongoose')

const postSchema= new mongoose.Schema({
    /*user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },*/
    title:{
        type: String,
        unique: true,
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
    date:{
        type: Date,
        default: Date.now
    }
    /*
        images
    */
})

module.exports=mongoose.model('post', postSchema);