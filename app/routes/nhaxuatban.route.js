const express  = require("express");
const nhaxuatban = require("../controllers/nhaxuatban.controllers");

const router = express.Router();

router.route("/")
    .get(nhaxuatban.findAll)
    .post(nhaxuatban.create)
    .delete(nhaxuatban.deleteAll);

// router.route("/favorite")
//     .get(nhaxuatban.findAllFavorite);

router.route("/:id")
    .get(nhaxuatban.findOne)
    .put(nhaxuatban.update)
    .delete(nhaxuatban.delete);


// router.route("/find/:manxb")
//     .get(nxb.findByMaNXB)

module.exports = router;

