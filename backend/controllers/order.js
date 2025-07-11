const ordermodel = require("../models/order")
const usermodel = require("../models/user")
const Stripe =require("stripe")
const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)

let currency = 'egp'; 
const deliveryCharge = 10

// fallback to USD if EGP is not supported by Stripe
const SUPPORTED_CURRENCIES = ['usd', 'egp', 'eur', 'gbp', 'aed', 'sar', 'cad', 'aud', 'jpy', 'cny', 'inr'];
if (!SUPPORTED_CURRENCIES.includes(currency)) {
  currency = 'usd';
}

//cash on delivery method
exports.placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = 
        { 
            userId: String(userId),
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now() 
        }
            const newOrder= new ordermodel(orderData)
            await newOrder.save()

            await usermodel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ success: false, message: "Order failed", error: error.message });
    }
}

//stripe method
exports.placeOrderStripe = async (req, res) => {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ success: false, message: "Stripe secret key not set in backend." });
        }
        const { userId, items, amount, address } = req.body
        const {origin} = req.headers
        const orderData = 
        { 
            userId: String(userId),
            items,
            amount,
            address,
            paymentMethod:"stripe",
            payment: false,
            date: Date.now() 
        }
        const newOrder= new ordermodel(orderData)
        await newOrder.save()

        let stripeCurrency = currency;
        if (!SUPPORTED_CURRENCIES.includes(stripeCurrency)) {
            stripeCurrency = 'usd';
        }

        const line_items = items.map((item)=>(
            {
                price_data:{
                    currency:stripeCurrency,
                    product_data:{
                        name:item.name
                    },unit_amount:item.price*100
                },quantity:item.quantity
            }
        ))
        line_items.push({
            price_data:{
                currency:stripeCurrency,
                product_data:{
                    name:'Delivery Charges'
                },unit_amount:deliveryCharge*100
            },quantity:1
        })

            const session = await stripe.checkout.sessions.create({
                success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
                line_items,
                mode:'payment'
            })
            res.json({success:true,session_url:session.url})
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ success: false, message: "Order failed", error: error.message });
    }
}

//razorpay method
exports.placeOrderRaz = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = 
        { 
            userId: String(userId),
            items,
            amount,
            address,
            paymentMethod:"razorpay",
            payment: false,
            date: Date.now() 
        }
        const newOrder= new ordermodel(orderData)
        await newOrder.save()

        await usermodel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed", orderId: newOrder._id})
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ success: false, message: "Order failed", error: error.message });
    }
}

exports.verifyStripe = async (req, res) => {
    try {
        const { orderId, userId, success } = req.body;
        console.log('verifyStripe called with:', { orderId, userId, success });
        if (!orderId || !userId) {
            return res.status(400).json({ success: false, message: 'orderId and userId are required' });
        }
        if (success === "true") {
            const updatedOrder = await ordermodel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
            await usermodel.findByIdAndUpdate(userId, { cartData: {} });
            if (updatedOrder) {
                console.log('Order payment updated to true:', updatedOrder._id);
                return res.json({ success: true });
            } else {
                console.log('Order not found for payment update:', orderId);
                return res.status(404).json({ success: false, message: 'Order not found' });
            }
        } else {
            await ordermodel.findByIdAndDelete(orderId);
            console.log('Order deleted due to failed payment:', orderId);
            return res.json({ success: false });
        }
    } catch (error) {
        console.error("Order verification error:", error);
        res.status(500).json({ success: false, message: "Order verification failed", error: error.message });
    }
}



//all orders data for Admin
exports.allOrders = async (req, res) => {
    try {
        const orders = await ordermodel.find({}).sort({ date: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
}

//all orders data for frontEnd
exports.userOrders = async (req, res) => {
    try {
        const {userId}=req.body;
        console.log("Queried userId:", userId);
        const orders= await ordermodel.find({userId: String(userId)});
        console.log("Orders found:", orders);
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false,message:"Error happend"});
    }
}


//update order status from tha Admin
exports.updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "orderId and status are required" });
        }

        const updatedOrder = await ordermodel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Error updating order status", error: error.message });
    }
}