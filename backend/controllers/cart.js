const usermodel=require('../models/user')

exports.addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body
        console.log("Add to cart request:", { userId, itemId, size });
        
        if (!userId || !itemId || !size) {
            console.log("Missing required fields:", { userId, itemId, size });
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const userData = await usermodel.findById(userId);
        if (!userData) {
            console.log("User not found:", userId);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let cartData = userData.cartData || {};
        console.log("Current cart data:", cartData);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        console.log("Updated cart data:", cartData);
        const updatedUser = await usermodel.findByIdAndUpdate(userId, { cartData }, { new: true });
        console.log("User updated successfully:", updatedUser._id);
        
        res.json({ success: true, message: "Added to Cart successfully" });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ success: false, message: "Error happened", error: error.message });
    }
}

exports.updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body
        console.log("Update cart request:", { userId, itemId, size, quantity });

        if (!userId || !itemId || !size || quantity === undefined) {
            console.log("Missing required fields:", { userId, itemId, size, quantity });
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const userData = await usermodel.findById(userId);
        if (!userData) {
            console.log("User not found:", userId);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let cartData = userData.cartData || {};
        console.log("Current cart data:", cartData);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = quantity;

        console.log("Updated cart data:", cartData);
        const updatedUser = await usermodel.findByIdAndUpdate(userId, { cartData }, { new: true });
        console.log("User updated successfully:", updatedUser._id);

        res.json({ success: true, message: "Cart Updated successfully" });
    } catch (error) {
        console.error("Update cart error:", error);
        res.status(500).json({ success: false, message: "Error happened", error: error.message });
    }
}

exports.getUserCart = async (req, res) => {
    try {
        console.log("getUserCart called with body:", req.body);
        const {userId} = req.body
        
        if (!userId) {
            console.log("userId is missing from request body");
            return res.status(400).json({
                success: false,
                message: "Missing required field"
            });
        }

        console.log("Looking for user with ID:", userId);
        const userData = await usermodel.findById(userId);
        if (!userData) {
            console.log("User not found for ID:", userId);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const cartData = userData.cartData || {};
        console.log("Cart data for user:", cartData);

        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Get user cart error:", error);
        res.status(500).json({ success: false, message: "Error happened", error: error.message });
    }
}

exports.removefromcart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        console.log("Remove from cart request:", { userId, itemId, size });

        if (!userId || !itemId || !size) {
            console.log("Missing required fields:", { userId, itemId, size });
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const userData = await usermodel.findById(userId);
        if (!userData) {
            console.log("User not found:", userId);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let cartData = userData.cartData || {};
        console.log("Current cart data:", cartData);

        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            delete cartData[itemId][size];
            // If no sizes left for this item, remove the itemId key
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            console.log("Item not found in cart:", { itemId, size });
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        console.log("Updated cart data:", cartData);
        const updatedUser = await usermodel.findByIdAndUpdate(userId, { cartData }, { new: true });
        console.log("User updated successfully:", updatedUser._id);

        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({ success: false, message: "Error happened", error: error.message });
    }
}

exports.removeall = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("Remove all from cart request:", { userId });

        if (!userId) {
            console.log("Missing required field: userId");
            return res.status(400).json({
                success: false,
                message: "Missing required field"
            });
        }

        const userData = await usermodel.findById(userId);
        if (!userData) {
            console.log("User not found:", userId);
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const updatedUser = await usermodel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });
        console.log("User cart cleared successfully:", updatedUser._id);

        res.json({ success: true, message: "All items removed from cart" });
    } catch (error) {
        console.error("Remove all from cart error:", error);
        res.status(500).json({ success: false, message: "Error happened", error: error.message });
    }
}