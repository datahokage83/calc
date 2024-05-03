// const mongoose = require('mongoose')
// const dbConfig = require('../../config/db.config')

// mongoose.Promise = global.Promise

// const db = {}
// db.mongoose = mongoose
// db.url = process.env.DATABASE_ACCESS || dbConfig.url

// db.userModel = require('./user.model')(mongoose)
// db.resultModel = require('./result.model')(mongoose)
// module.exports = db

const mongoose = require('mongoose');
const dbConfig = require('../../config/db.config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_ACCESS || dbConfig.url;

db.userModel = require('./user.model');
// db.resultModel = require('./result.model');
module.exports = db;
