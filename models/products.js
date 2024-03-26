const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    currency: { type: String, required: true },
    rebateQuantity: { type: Number, default: 0 },
    rebatePercent: { type: Number, default: 0 },
    upsellProductId: { type: String, default: null },
    imagePath: { type: String, required: true },
    giftWrap: { type: Boolean, default: false }
}, {timestamps: true});

module.exports = mongoose.model('Products', productSchema);
