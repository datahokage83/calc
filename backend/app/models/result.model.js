// result.model.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    result: { type: Number, default: null },
});

const ResultModel = mongoose.model('Result', resultSchema);

module.exports = ResultModel;
