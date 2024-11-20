const express = require("express");
const theodoi = require("../controllers/theodoi.controllers");

const router = express.Router();

router.route("/")
    .get(theodoi.findAll)
    .post(theodoi.create);
    // .delete(theodoi.deleteAll);

router.route("/:id")
    .get(theodoi.findOne)
    .put(theodoi.update)
    .delete(theodoi.delete);

module.exports = router;