'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuerySchema = new Schema({
    isDefault: {
        type: Boolean
    },
    name: {
        type: String
    },
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