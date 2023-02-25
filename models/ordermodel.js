const mongoose = require("mongoose");
const User = require("./usermodel");
const Books = require("./bookmodel");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  amount: Number,
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  deliveryAddress: String,
  paymentResult: {
    id: String,
    status: String,
    updateTime: String,
    emailAddress: String,
  },
  orderItems: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Books" },
      price: Number,
      title: String,
      subject: String,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
