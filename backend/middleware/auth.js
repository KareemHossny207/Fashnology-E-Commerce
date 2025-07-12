const jwt =require("jsonwebtoken")

const userauth =async(req,res,next)=>{
    const {token}=req.headers;
    console.log("Auth middleware - token from headers:", token);
    if (!token) {
        console.log("No token provided");
        return res.json({success:false, message:"Login First"})
    }
    try {
        const token_decode = jwt.verify(token ,process.env.JWT_SECRET);
        console.log("Token decoded:", token_decode);
        req.body.userId=token_decode.id
        console.log("Added userId to req.body:", req.body.userId);
        next()
    } catch (error) {
        console.log("JWT verification error:", error);
        return res.json({success:false, message:"error happened"})

    }
}

module.exports = userauth;
