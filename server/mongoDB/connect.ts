const mongoose = require('mongoose');

const connectDB = async (url: string) => {
  try {
    // To remove strictQuery warning
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };

export {};
