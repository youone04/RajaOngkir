const knex = require('knex');
const knexfile = require('../knexfile');

const db = process.env.NODE_ENV == 'production' ? knex(knexfile.production) : knex(knexfile.development);

module.exports = db;