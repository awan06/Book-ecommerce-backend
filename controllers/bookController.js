const Book = require("./../models/bookmodel");
const url = require("url");
exports.getAllBooks = async (req, res, next) => {
  try {
    const { query } = url.parse(req.url, true);
    console.log(query);
    const books = await Book.find({
      title: { $regex: query.title ? query.title : "", $options: "i" },
      course: { $regex: query.course ? query.course : "", $options: "i" },
      subject: { $regex: query.subject ? query.subject : "", $options: "i" },
      type: query.type,
    });
    //

    // const books = await Book.aggregate([
    //   {
    //     $match: {
    //       title: {
    //         $regex: query.title ? query.title : "",
    //         $options: "i",
    //       },
    //       subject: {
    //         $regex: query.subject ? query.subject : "",
    //         $options: "i",
    //       },
    //       semester: {
    //         $regex: query.semester ? query.semester : "",
    //         $options: "i",
    //       },
    //       course: {
    //         $regex: query.course ? query.course : "",
    //         $options: "i",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       __v: 0,
    //     },
    //   },
    // ]);
    console.log(books);
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      err,
    });
  }
};
