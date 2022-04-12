const db = require('../../db');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: `dazrfoep1`,
    api_key:  `545739469687763`,
    api_secret: `UGgT35jU4f8KLmee6vkaILuVpBY`
});


exports.transaksi = async(req, res) => {
    // console.log(req.file.path);
    const {
        username ,email, 
        provinsi, kabupaten,
        alamat ,ongkir,
        tagihan_total , 
        user_id, estimasi , 
        service} = req.body;

    const hsl = new Promise((resolve , reject) => {
        cloudinary.uploader.upload(req.file.path , async (err ,result) => {
          if(err) throw err;
          await db('transaksi').insert({
            username ,
            email, 
            provinsi, 
            kabupaten,alamat ,
            ongkir, 
            tagihan_total , 
            user_id, estimasi , 
            service,
            bukti_bayar	: result.url,
        })
         resolve(result.url)
     })
        
    });

    const data = await hsl;


    // console.log(req.file)
    res.status(200).send({
        status: 200,
        message: 'Sucesss',
        data: data
    })

}