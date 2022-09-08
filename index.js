//connecting to mongoDb using mongoose

const connectToMongo=require("./db.js")
connectToMongo();

// ------------------------------------ 
//making an express server
const express=require('express')

const app=express();
const port=3000;

app.use(express.json()) //middleware which has the access of request and response objects

//The middleware function app.use() is executed when the base of the requested path matches path.
app.use('/api/auth', require("./routes/auth"));
app.use('/api/post', require("./routes/post"));

app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`);
})
