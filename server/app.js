require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const { notFound, errorHandler } = require('./middleware/customAPIError');
const userRouter = require('./routes/user.routes');

// const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();

//Get environmental variables
const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL;

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/v1/user', userRouter);

//Error handlers
app.use('*', notFound)
app.use(errorHandler);

// Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/template', require('./routes/template.route'));
app.use('/feedbackform', require('./routes/feedbackform'));
app.use('/feedbackresponse', require('./routes/feedbackresponse'))

const startServer = async() =>{
await connectDB(DBURL);
app.listen(PORT, () => {
    console.log(`Server is listening to Port: ${PORT}...`);
})
}

startServer();
