'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuerySchema = new Schema({
    priceRangeMin: {
        type: Number
    },
    priceRangeMax: {
        type: Number
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Queries', QuerySchema);