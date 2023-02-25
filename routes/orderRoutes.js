const express = require("express");
const orderController = require("./../controllers/orderController");
const userController = require("./../controllers/userController");
const router = express.Router();

router
  .route("/")
  .get(orderController.getAllOrders)
  .post(userController.protect, orderController.createOrder);
router
  .route("/myorders")
  .get(userController.protect, orderController.getUserOrder);
router.route("/:id").get(orderController.getOrder);

router.route("/:id/delivered").post(orderController.updateDeliveredOrder);
router.route("/:id/paid").post(orderController.updatePaidOrder);

module.exports = router;
