const request = require("request");

exports.getCity = async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://api.rajaongkir.com/starter/city',
    qs: {province: `${req.body.id_prov}`},
    headers: {key: 'd5efe8aee69a28b829bb1fc959543281', 'content-type': 'application/x-www-form-urlencoded'},
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
      const hasil = JSON.parse(body)
        res.status(200).json(hasil.rajaongkir.results)
      });
  };
  
exports.getCost = async (req , res) => {
  const options = {
    method: 'POST',
    url: 'https://api.rajaongkir.com/starter/cost',
    headers: {key: 'd5efe8aee69a28b829bb1fc959543281', 'content-type': 'application/x-www-form-urlencoded'},
    form: {origin: '21', destination: req.body.destination, weight: req.body.weight, courier: 'jne'}
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    const hasil = JSON.parse(body)
        res.status(200).json(hasil)
      });
}