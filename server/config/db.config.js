const {connect} = require('mongoose');

const connectDB = async(URL) => {
  try {
    await connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, ()=>{
        console.log("Connected to Database successfully");
    });
  } catch (error) {
    throw error;
  }
}


module.exports =connectDB;