const jwt =require('jsonwebtoken')

const adminauth=async(req,res,next)=>{
try {
    const {token}=req.headers
    console.log("Admin auth - Token received:", token ? "Yes" : "No");
    console.log("Admin auth - JWT_SECRET exists:", !!process.env.JWT_SECRET);
    console.log("Admin auth - JWT_SECRET length:", process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
    
    if(!token){
        console.log("Admin auth - No token provided");
        return res.json({message:"Not Authorized ",success:false})
    }
    
    if (!process.env.JWT_SECRET) {
        console.log("Admin auth - JWT_SECRET is not set!");
        return res.status(500).json({message:"Server configuration error",success:false})
    }
    
    const token_decode = jwt.verify(token ,process.env.JWT_SECRET);
    console.log("Admin auth - Decoded token:", token_decode);
    console.log("Admin auth - Admin email from env:", process.env.ADMIN_EMAIL);
    
    // Check if the user is an admin by checking their email
    // The email is stored as 'id' in the token
    if (token_decode.id !== process.env.ADMIN_EMAIL) {
        console.log("Admin auth - Email mismatch. Token email:", token_decode.id, "Expected:", process.env.ADMIN_EMAIL);
        return res.json({message:"Not Authorized - Admin access required",success:false})
    }
    
    console.log("Admin auth - Authentication successful");
    next()
} catch (error) {
    console.error("Admin auth error:", error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
}

}
module.exports = adminauth;
