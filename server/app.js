require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const { notFound, errorHandler } = require('./middleware/customAPIError');
const userRouter = require('./routes/user.routes');
const feedBackRouter = require('./routes/feedback.routes');
const authRouter = require('./routes/auth.route')

// const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const templateRouter = require('./routes/template.route');

const app = express();

//Get environmental variables
const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL;

app.use(cors(corsOptions));

app.use(express.json());


// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/feedback', feedBackRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/template', templateRouter);

//Error handlers
app.use('*', notFound)
app.use(errorHandler);

const startServer = async() =>{
await connectDB(DBURL);
app.listen(PORT, () => {
    console.log(`Server is listening to Port: ${PORT}...`);
})
}

startServer();
