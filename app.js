const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const userRoute = require('./folder/routes/userRoute')
const courseRoute = require('./folder/routes/courseRoute')
const enrollmentRoute = require('./folder/routes/enrollmentRoute')

const app = express();
const port = process.env.PORT || 9090

mongoose.connect ('mongodb+srv://elearn:elearn@elearn.omkib.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/user',userRoute)
app.use('/course', courseRoute)
app.use('/enrollments', enrollmentRoute)

app.get('/', (req, res)=>{
    console.log('running')
    res.status(200)
})

app.listen(port, ()=>{
    console.log(`Speak Lord, I am listening on port ${port}`)
})