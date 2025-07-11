const express = require("express")
const router = express.Router();
const productController = require("../controllers/product");
const multer = require('../middleware/multer');
const adminauth = require('../middleware/adminauth');

// Configure multer for multiple image uploads
const uploadMultipleImages = multer.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]);



// Create a new product (with file uploads)
// POST /api/product/create
// This route allows creating a new product with up to 4 images
// Uses uploadMultipleImages middleware to handle file uploads
router.post('/create', adminauth,uploadMultipleImages, productController.createProduct);


// Get all products
// GET /api/product/all
// Returns products sorted by creation date (newest first)
router.get('/all', productController.getAllProducts);

// Get product by ID
// GET /api/product/:id

router.get('/:id', productController.getProductById);

// Update product
// PUT /api/product/:id
// This route allows updating an existing product's information
// Requires product ID in URL parameters
router.put('/:id', adminauth,productController.updateProduct);

// Delete product
// DELETE /api/product/:id
router.delete('/:id', adminauth,productController.deleteProduct);

// Get products by category
// GET /api/product/category/:category
router.get('/category/:category', productController.getProductsByCategory);

// Get bestseller products
// GET /api/product/bestsellers/all
router.get('/bestsellers/all', productController.getBestsellers);

// // Search products
// // GET /api/product/search?q=searchterm
// // This route searches products across multiple fields
// // Searches in name, description, category, and subcategory
// // Uses case-insensitive regex matching
// router.get('/search', productController.searchProducts);

module.exports = router;