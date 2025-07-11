const mongoose =require('mongoose')
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        default: []
    },
    sizes: {
        type: Array,
        required:true
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productSchema);