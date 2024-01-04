const express = require('express');
const app = express();
const cors = require('cors')
const routes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use('/uploads', express.static(__dirname + '/uploads'))

const dbConnect = async() =>{
    try{
        const dbConnection = await mongoose.connect('mongodb+srv://neerav_vinod:x9q4OZn5IOqobp78@blogappdb.i9uawed.mongodb.net/?retryWrites=true&w=majority')
        console.log('connected to db');
    }
    catch(e){
        console.log(e)
    }
 
   
}

dbConnect();

app.post('/',(req,res)=>{
    res.res("You have created a server")
})

app.get('/test',(req,res)=>{
    res.json({"message":"Hi this is a test server"})
})

app.use('/user',routes)
app.use('/post', express.static('D:/project/Blog-app/server/uploads'),postRoutes)



app.listen(4000, ()=>{
    console.log("Listening to port 4000")
})