const mongoose = require('mongoose');
const uri ="mongodb+srv://ecommerceproject581:DB4WT9rsLeZVvOgv@cluster0.hdg7q9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectingDB = async () => {
  try {
    mongoose.set('strictQuery', false); 
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if connection fails 
  }
};

module.exports = connectingDB;
