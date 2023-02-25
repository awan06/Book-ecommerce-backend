const User = require("./../models/usermodel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // cookieOptions.secure = true;
  // res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    createSendToken(newUser, 201, res);
    // res.status(200).json({
    //     success: true,
    //     data: {
    //         newUser
    //     }
    // });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: "Invalid",
        message: "Invalid email or password",
      });
      return;
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(password == user.password)) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({ message: "User not Found" });
    }
    console.log(freshUser);
    req.user = freshUser;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(500).json({ message: "User not logged in" });
  }
};
