const express = require("express");
let router = express.Router();
const controller= require("../controller");
const controllerTransaksi = require('../controller/Transaksi');
const controllerReview = require('../controller/Review')
const { upload } = require("../middleware");
  

router.post("/kota", controller.getCity);
router.post("/ongkir", controller.getCost);
router.post('/transaksi', upload.single('bukti_bayar'), controllerTransaksi.transaksi);
router.get('/transaksi', controllerTransaksi.getTransaksi);
router.get("/pesanan/:id", controllerTransaksi.pesanan);
router.put("/konfirmasi/:id", controllerTransaksi.konfirmasiPembayaran);
router.get("/rekapitulasi-transaksi", controllerTransaksi.rekapitulasiTransaksi);
router.post("/review/:id", controllerReview.review);
router.delete("/konfirmasi/:id", controllerTransaksi.deleteTransaksi);


module.exports = { router };
