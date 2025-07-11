const Productmodel = require('../models/product');
const cloudinary = require('cloudinary').v2;
const connectingcloudinary = require('../config/cloudinary');

// Initialize Cloudinary connection
connectingcloudinary();

// Product creation with image uploads to Cloudinary
exports.createProduct = async (req, res) => {
  try {
    console.log('=== CREATE PRODUCT REQUEST ===');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    console.log('Request headers:', req.headers);
    
    const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

    // required fields
    if (!name || !description || !price || !category || !subcategory || !sizes) {
      console.log('Missing required fields:', { name, description, price, category, subcategory, sizes });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Extract uploaded image files from request (req.files)
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    // Filter out undefined images and create array of valid image files
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
    
    console.log('Images found:', images.length);
    console.log('req.files:', req.files);
    
    let imageUrls = [];
    
    // Upload images to Cloudinary if any images were provided
    if (images.length > 0) {
      try {
        // Check if Cloudinary is configured
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
          return res.status(500).json({
            success: false,
            message: 'Cloudinary is not configured. Please set up Cloudinary environment variables.'
          });
        }

        console.log('Starting image upload to Cloudinary...');
        
        // Use Promise.all to upload all images concurrently for better performance
        imageUrls = await Promise.all(
          images.map(async (item, index) => {
            console.log(`Uploading image ${index + 1}:`, item.originalname);
            // Upload each image to Cloudinary and return the secure URL
            const result = await cloudinary.uploader.upload(item.path, { 
              resource_type: 'image',
              folder: 'products' // Optional: organize images in a folder
            });
            console.log(`Image ${index + 1} uploaded successfully:`, result.secure_url);
            return result.secure_url;
          })
        );
        
        console.log('All images uploaded successfully:', imageUrls);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload images to Cloudinary',
          error: uploadError.message,
          details: uploadError.stack
        });
      }
    } else {
      console.log('No images provided for upload');
    }



    // Create new product instance with all the data
    const newProduct = new Productmodel({
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      image: imageUrls,
      bestseller: bestseller === 'true' ? true : false,
      date: new Date()
    });

    // Save the product to MongoDB database
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      newProduct
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: "Couldn't create the product",
      error: error.message
    });
  }
};

// Fetch all products from database and sort by date (newest first) //

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Productmodel.find().sort({ date: -1 });
    
    
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    // Handle database query errors
    console.error('Get all products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// find product using Id //

exports.getProductById = async (req, res) => {
  try {

    const { id } = req.params;
    
    
    const product = await Productmodel.findById(id);
    
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

//updating any product field using the product ID//

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // new: true returns the updated document
    // runValidators: true ensures validation runs on update
    const product = await Productmodel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// delete product usung Id //

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Productmodel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {

    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// get products that have the same category sort by creation date(newest first) //

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = await Productmodel.find({ category }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

//get the best sellers  products sort by creation date (newest first) //

exports.getBestsellers = async (req, res) => {
  try {
    const products = await Productmodel.find({ bestseller: true }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    console.error('Get bestsellers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};




// Search products - This function handles product search functionality
// It searches across multiple fields in the product database using regex pattern matching
exports.searchProducts = async (req, res) => {
  try {
    // Extract the search query from request query parameters
    // 'q' is the standard parameter name for search queries
    const { q } = req.query;
    
    // Validate that a search query was provided
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Perform database search using MongoDB's $or operator
    // This allows searching across multiple fields simultaneously
    // $regex: q - creates a regular expression pattern from the search query
    // $options: 'i' - makes the search case-insensitive
    // Fields being searched: name, description, category, subcategory
    const products = await Productmodel.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },        // Search in product name
        { description: { $regex: q, $options: 'i' } }, // Search in product description
        { category: { $regex: q, $options: 'i' } },    // Search in product category
        { subcategory: { $regex: q, $options: 'i' } }  // Search in product subcategory
      ]
    }).sort({ date: -1 }); // Sort results by date (newest first)

    // Return successful response with search results
    // Include count of found products and the products array
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
