const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    id: String, // If this is referencing another collection's ObjectId, consider changing the type to Schema.Types.ObjectId
    name: String,
    quantity: Number,
    price: Number,
    giftWrap: Boolean,
});

const orderSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    companyName: { type: String },
    companyVATNumber: { type: String },
    cartItems: [cartItemSchema], // Embedded sub-document for cart items
    totalPrice: { type: Number, required: true }, // Make sure to convert the totalPrice to a Number if it's provided as a string
    paymentMethod: { type: String, required: true },
    paymentDetails: {
        mobilePayNumber: String, // Adjust according to your payment method requirements
    },
    acceptTerms: { type: Boolean, required: true },
    acceptMarketing: { type: Boolean, default: false },
    orderComment: { type: String },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

module.exports = mongoose.model('Orders', orderSchema);