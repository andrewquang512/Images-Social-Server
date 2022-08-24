const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// ? new standard now is sync await, use when it is synchronous
// not this mongoose.connect(db)

const connectDB = async () => {
  //? practice using try catch
  try {
    // await mongoose.connect(db) or under method are both correct
    await mongoose.connect(db, {
      useNewUrlParser: true,
      // * useCreateIndex: true, is deprecated
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
    // ? exit process with failure (1), success(0)
  }
};

module.exports = connectDB;
