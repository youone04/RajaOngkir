const db = require("../../db");
var cloudinary = require("cloudinary").v2;
const https = require("https");

cloudinary.config({
  cloud_name: `dazrfoep1`,
  api_key: `545739469687763`,
  api_secret: `UGgT35jU4f8KLmee6vkaILuVpBY`,
});

exports.transaksi = async (req, res) => {
  // console.log(req.file.path);
  const {
    username,
    email,
    provinsi,
    kabupaten,
    alamat,
    ongkir,
    tagihan_total,
    user_id,
    estimasi,
    service,
    gambar_produk,
    nama_produk,
    jumlah,
    produk_id
  } = req.body;

  const hsl = new Promise((resolve, reject) => {
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) throw err;
      await db("transaksi").insert({
        nama_produk,
        gambar_produk,
        username,
        email,
        provinsi,
        kabupaten,
        alamat,
        ongkir,
        tagihan_total,
        user_id,
        produk_id,
        estimasi,
        service,
        jumlah,
        bukti_bayar: result.url,
      });
      resolve(result.url);
    });
  });

  const data = await hsl;

  // console.log(req.file)
  res.status(200).send({
    status: 200,
    message: "Sucesss",
    data: data,
  });
};

exports.pesanan = (req, res) => {
  db("transaksi")
    .where("email", req.params.id)
    .select("*")
    .then((data) => {
      res.status(200).send({
        status: 200,
        message: "Sucesss",
        data: data,
      });
    });
};

exports.getTransaksi = (req, res) => {
  db("transaksi")
    .select("*")
    .then((data) => {
      res.status(200).send({
        status: 200,
        message: "Sucesss",
        data: data,
      });
    })
    .catch((err) => {
      res.status(200).send({
        status: 200,
        message: "Failed",
        data: err,
      });
    });
};

exports.konfirmasiPembayaran = (req, result) => {
  const { status, no_resi, username, email } = req.body;
  db("transaksi")
    .where("id", req.params.id)
    .update({ status, no_resi })
    .then(() => {
      // result.status(200).send({
      //   status: 200,
      //   message: "Sucesss",
      //   data: [],
      // });
      
      const url = `https://docs.google.com/forms/d/e/1FAIpQLSduE9vXto2YWWObH8RCWs0X18FEREguIsRWxZ4rTONsmfARcQ/formResponse?usp=pp_url&entry.170224335=${username}&entry.1262973823=${no_resi}&entry.357809264=${email}&=`;
      https
        .get(url, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            result.status(200).send({
                status: 200,
                message: "Sucesss",
                data: [],
              });
          });
        })
        .on("error", (err) => {
            result.status(200).send({
                status: 200,
                message: "Failed",
                data: err,
              });
        });
    })
    .catch((err) => {
      result.status(500).send({
        status: 500,
        message: "Failed",
        data: err,
      });
    });
};

exports.rekapitulasiTransaksi = (req, res) => {
  const{bulan , tahun} = req.query;
  db.raw(
    `SELECT * FROM transaksi WHERE to_char(created_at, 'YYYY-MM')  = '${tahun}-${bulan}' `
  )
  .then((data) => {
    db.raw(`SELECT SUM(tagihan_total) FROM transaksi WHERE to_char(created_at, 'YYYY-MM')  = '${tahun}-${bulan}'`)
    .then((data2) => {

      res.status(200).send({
        status: 200,
        message: "Sucesss",
        data: data.rows,
        pendapatan: data2.rows[0].sum,
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        status: 500,
        message: "Failed",
        data: err,
      });
    });

  })

  .catch((err) => {
    console.log(err)
    res.status(500).send({
      status: 500,
      message: "Failed",
      data: err,
    });
  });
}