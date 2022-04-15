const express = require("express");
let router = express.Router();
const controller= require("../controller");
const controllerTransaksi = require('../controller/Transaksi');
const { upload } = require("../middleware");
  

router.post("/kota", controller.getCity);
router.post("/ongkir", controller.getCost);
router.post('/transaksi', upload.single('bukti_bayar'), controllerTransaksi.transaksi);
router.get('/transaksi', controllerTransaksi.getTransaksi);
router.get("/pesanan/:id", controllerTransaksi.pesanan);
router.put("/konfirmasi/:id", controllerTransaksi.konfirmasiPembayaran);
router.get("/rekapitulasi-transaksi", controllerTransaksi.rekapitulasiTransaksi);

module.exports = { router };
