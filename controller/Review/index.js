const db = require("../../db");

exports.review =async (req, res) => {
    const {id} = req.params;
   try{
  await  db("transaksi").update({review:true}).where('id' ,id)
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