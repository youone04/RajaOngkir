const express = require("express");
let router = express.Router();

const controller= require("../controller");

router.post("/kota", controller.getCity);
router.post("/ongkir", controller.getCost);


module.exports = { router };
