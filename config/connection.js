const { connect, connection } = require('mongoose');

connect('mongodb://127.0.9.1:27017/groupThinkDB')

module.exports = connection;