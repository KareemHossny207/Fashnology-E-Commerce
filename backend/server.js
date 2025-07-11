require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectingDB = require('./config/mongo');
const connectingcloudinary = require('./config/cloudinary');
const userRouter=require("./routes/user")
const productRouter=require("./routes/product")
const cartRouter=require("./routes/cart")
const orderRouter=require("./routes/order")

app.use(cors());
app.use(express.json());

if (typeof connectingDB === 'function') connectingDB();
if (typeof connectingcloudinary === 'function') connectingcloudinary();

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

const PORT = process.env.PORT || 5777;

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server is running on port ${PORT}`);
});