require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
// const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();

//Get environmental variables
const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL;

app.use(cors(corsOptions));

app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/template', require('./routes/template.route'));
app.use('/feedbackform', require('./routes/feedbackform'));
app.use('/feedbackresponse', require('./routes/feedbackresponse'))

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(pathjoin(__dirname, 'views', '404.html'))
//     } else if (req.accepts('json')) {
//         res.json({"error": "404 Not Found"});
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

const startServer = async() =>{
await connectDB(DBURL);
app.listen(PORT, () => {
    console.log(`Server is listening to Port: ${PORT}...`);
})
}

startServer();
