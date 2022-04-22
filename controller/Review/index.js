const db = require("../../db");

exports.review = (req, res) => {
    const {review} = req.body;
    const {id} = req.params;
   try{
    db("transaksi").update({review}).where('id' ,id)
    res.status(200).send({
        status: 200,
        message: 'success'
    })
   }catch(error){
    res.status(500).send({
        status: 500,
        message:  error.response && error.response.data.message ? error.response.data.message : error.message
    })
   }
     
  };