// const User = require('./../models/usermodel');
// const Books = require('./../models/bookmodel');
const Order = require("./../models/ordermodel");

// getAllOrders admin
// createOrder
// getOrder
// getUserOrder
// updateDeliveredOrder admin
// updatePaidOrder

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const loggedUser = req.user;
    console.log(req.body.orderItems);
    const newOrder = await Order.create({
      user: loggedUser._id,
      amount: req.body.amount,
      isPaid: false,
      isDelivered: false,
      deliveryAddress: req.body.deliveryAddress,
      //paymentResult: { ...req.paymentResult },
      orderItems: [...req.body.orderItems],
    });
    console.log(newOrder);
    res.status(201).json({
      success: true,
      data: {
        newOrder,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "error",
      err,
    });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

exports.getUserOrder = async (req, res, next) => {
  try {
    const loggedUser = req.user;
    const order = await Order.find({ user: loggedUser._id });
    console.log(order);
    res.status(200).json({
      status: "success",
      data: order,
    });
    //res.json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

exports.updateDeliveredOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        isDelivered: true,
        deliveredAt: new Date().toISOString(),
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updatePaidOrder = async (req, res, next) => {
  try {
    //order.paymentResult =
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentResult: {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        },
        isPaid: true,
        paidAt: new Date().toISOString(),
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
