const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the base PaymentDetail schema with discriminator key
const PaymentDetailSchema = new Schema({
    method: { type: String, required: true },
}, { discriminatorKey: 'method', _id: false });

// Create a PaymentDetail model based on the base schema
const PaymentDetail = mongoose.model('PaymentDetail', PaymentDetailSchema);

// Define discriminator for GiftCard payment method
PaymentDetail.discriminator('giftCard', new Schema({
    giftCardNumber: { type: String, required: true },
    giftCardAmount: { type: Number, required: true },
}, { _id: false }));

// Define discriminator for other payment methods as needed
// Example: MobilePay
PaymentDetail.discriminator('MobilePay', new Schema({
    mobilePayNumber: { type: String, required: true },
}, { _id: false }));

// Invoice example (assuming it requires no additional fields)
PaymentDetail.discriminator('Invoice', new Schema({}, { _id: false }));

const cartItemSchema = new Schema({
    id: { type: String, required: true },  // Changed from ObjectId to String
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    giftWrap: { type: Boolean, required: true },
});

// Define the main Order schema
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
    cartItems: [cartItemSchema],
    totalPrice: { type: Number, required: true, set: v => parseFloat(v) }, // Ensure number format, especially if input could be a string
    paymentMethod: { type: String, required: true },
    paymentDetails: { type: Schema.Types.Mixed, required: true }, // Use Mixed type to accommodate various discriminator subtypes
    acceptTerms: { type: Boolean, required: true },
    acceptMarketing: { type: Boolean, default: false },
    orderComment: { type: String },
    customTimestamp: { type: Date }, // Optional: Store a custom timestamp if provided
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Export the Orders model
module.exports = mongoose.model('Orders', orderSchema);
