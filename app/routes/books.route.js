const express  = require("express");
const books = require("../controllers/books.controllers");

const router = express.Router();

router.route("/")
    .get(books.findAll)
    .post(books.create);
    // .delete(books.deleteAll)
    // .put(books.checkLogin);



// router.route("/:id")
//     .get(contacts.findOne)
//     .put(contacts.update)
//     .delete(contacts.delete);

// router.route("/login")
//     .put(books.checkLogin)

module.exports = router;

