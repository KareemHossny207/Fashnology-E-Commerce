const usermodel=require('../models/user')
const validator =require('validator')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')


const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET);
}

exports.Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email'
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    const exists = await usermodel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash the password
    const hashedpass = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new usermodel({
      name,
      email,
      password: hashedpass
    });

    // Save user to database
    await newUser.save();
    const token = createToken(newUser._id)
    
    res.status(201).json({ 
      success: true, 
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user or password'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user or password'
      });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

exports.Admin=async (req,res)=>{
    try{
  const {email,password}=req.body
  if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    const token = jwt.sign({id: email}, process.env.JWT_SECRET)
    res.json({success:true ,token})
  }else{
    res.json({success:false ,message:"Invalid user or password"})
  }
    }catch(error){
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
}