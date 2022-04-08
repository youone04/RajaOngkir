const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {router} = require('./routes');
require('dotenv').config();
const cors = require('cors');
const corsOptions ={
    origin: "*", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', router);
//hanlder error photos



app.all('*', (req, res, next) => {
    res.status(404).send({
        status: 404,
        message: 'Routing tidak ditemukan!'
    });
    next();
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log('server on port!'+port);
})