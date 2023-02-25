const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/usermodel");
const app = express();
require("dotenv").config();

const BookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

// 1. Setting Up Database Connection

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORDDB);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connections successfully established");
  });

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});
app.use("/api/books", BookRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

// 3. Routes
app.get("/", (req, res, next) => {
  res.send("<p>Hello world</p>");
});

// //Server
const port = 5000;
app.listen(port, () => {
  console.log("Server Started Successfully");
});
