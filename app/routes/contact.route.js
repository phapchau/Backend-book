const express  = require("express");
const contacts = require("../controllers/contact.controllers");

const router = express.Router();

router.route("/")
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll)
    .put(contacts.checkLogIn);

router.route("/favorite")
    .get(contacts.findAllFavorite);

router.route("/:id")
    .get(contacts.findOne)
    .put(contacts.update)
    .delete(contacts.delete);

router.route("/login")
    .put(contacts.checkLogIn);


    //
// router.put('/path', (req, res) => {
//   // Xử lý yêu cầu PUT tại đây
//   res.send('Response');



module.exports = router;

