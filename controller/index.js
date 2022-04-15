const request = require("request");
// export const keyApi = ['d5efe8aee69a28b829bb1fc959543281','5cebef2479c3e7a17263b50f0e3b51c8' ,'6f3235b185ea29c153c7e8ec543c7040','06a8391cee099e830ae1c549004bba3c']

exports.getCity = async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://api.rajaongkir.com/starter/city',
    qs: {province: `${req.body.id_prov}`},
    headers: {key: '06a8391cee099e830ae1c549004bba3c', 'content-type': 'application/x-www-form-urlencoded'},
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
      const hasil = JSON.parse(body)
      console.log(hasil)
        res.status(200).json(hasil.rajaongkir.results)
      });
  };
  
exports.getCost = async (req , res) => {
  const options = {
    method: 'POST',
    url: 'https://api.rajaongkir.com/starter/cost',
    headers: {key: '06a8391cee099e830ae1c549004bba3c', 'content-type': 'application/x-www-form-urlencoded'},
    form: {origin: '21', destination: req.body.destination, weight: req.body.weight, courier: 'jne'}
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    const hasil = JSON.parse(body)
        res.status(200).json(hasil)
      });
}