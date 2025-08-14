
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Automatically add createdAt & updatedAt
});

module.exports = mongoose.model('Product', productSchema);
