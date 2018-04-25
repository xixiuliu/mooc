module.exports.test = 'A';

const modb = require('./02_modb');

console.log('moda:', modb.test);

module.exports.test = 'AA';