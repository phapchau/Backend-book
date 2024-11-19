const express = require("express");
const cors =  require("cors");

const contactsRouter = require("./app/routes/contact.route");
const booksRouter = require("./app/routes/books.route");
const nxbRouter = require("./app/routes/nhaxuatban.route");
const theodoiRouter = require("./app/routes/theodoi.route");
const nhanvienRouter = require("./app/routes/nhanvien.route");
const docgiaRouter = require("./app/routes/docgia.route");
const ApiError = require("./app/api-error.js");
const path =require('path');


const app = express();



app.use(cors());
app.use(express.json());

app.use('/api/uploads',express.static(path.join(__dirname, 'app/uploads')));
app.use("/api/contacts", contactsRouter);
app.use("/api/books", booksRouter);
app.use("/api/nhaxuatban", nxbRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/theodoi", theodoiRouter);
app.use("/api/docgia", docgiaRouter);
// define error-handling middeware last, after other app.use() and router calls


// handle 404 response
app.use((req, res, next) =>{
    //Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

app.get("/", (req, res) =>{
    res.json({ message: "Welcome to contact book application."});
});





app.use((error, req, res, next) => {
    //Middleware xử lý lỗi tập trung.
    //Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500 ).json({
        message: error.message || "Internal Server Error"});
});
module.exports = app;
