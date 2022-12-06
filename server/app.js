require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');


//Get environmental variables
const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL;

//create app
const app = express();
app.use(express.json());


const startServer = async() =>{
await connectDB(DBURL);
app.listen(PORT, () => {
    console.log(`Server is listening to Port: ${PORT}...`);
})
}

startServer();
