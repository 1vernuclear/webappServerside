const mongoose = require('mongoose');
const { Schema } = mongoose;

// Base schema for payment details, it will not be used directly
const PaymentDetailSchema = new Schema({
    method: { type: String, required: true },
}, { discriminatorKey: 'method', _id: false });

// Assuming we have an Order model set up
const paymentDetailModel = mongoose.model('PaymentDetail', PaymentDetailSchema);

// MobilePay details
paymentDetailModel.discriminator('MobilePay', new Schema({
    mobilePayNumber: { type: String, required: true },
}, { _id: false }));

// GiftCard details
paymentDetailModel.discriminator('GiftCard', new Schema({
    giftCardNumber: { type: String, required: true },
    giftCardAmount: { type: Number, required: true },
}, { _id: false }));

// Invoice details - assuming no additional fields are needed
paymentDetailModel.discriminator('Invoice', new Schema({}, { _id: false }));

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
        type: PaymentDetailSchema,
        required: true,
    },
    acceptTerms: { type: Boolean, required: true },
    acceptMarketing: { type: Boolean, default: false },
    orderComment: { type: String },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

module.exports = mongoose.model('Orders', orderSchema);