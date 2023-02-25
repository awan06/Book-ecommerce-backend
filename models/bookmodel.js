const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Book Must Have a name"],
    trim: true,
  },
  author: {
    type: String,
    //required: [true, 'A Book Must Have a author'],
  },
  edition: {
    type: Number,
    //required: [true, 'A Book Must Have an edition'],
  },
  subject: {
    type: String,
    required: [true, "A Book Must Have a subject"],
  },
  image: {
    type: String,
    required: [true, "A Book Must Have a image"],
  },
  price: {
    type: Number,
    required: [true, "A Book Must Have a price"],
  },
  condition: {
    type: String,
    //required: [true, 'Condition Field is required'],
  },
  course: {
    type: String,
    required: [true, "Course Field is required"],
  },
  semester: {
    type: Number,
    required: [true, "Semester Field is required"],
  },
  type: {
    type: String,
    enum: { values: ["Book", "Notes"], message: `{VALUE} is not supported` },
    required: [true, "Type field is required"],
  },
});

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;
