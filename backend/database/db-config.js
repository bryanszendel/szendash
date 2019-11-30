const knex = require('knex');

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')

module.exports = knex(config[environment]);