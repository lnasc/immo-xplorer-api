'use strict';


var mongoose = require('mongoose'),
    Query = mongoose.model('Queries');

var handleResponse = (res, err, result) => {
  if (err) {
    res.send(err);
  }
  res.json(result);
};

var updateQuery = (req, res) => {
  Query.findOneAndUpdate(
    req.body.isDefault 
      ? { isDefault: true }
      : { _id: req.params.queryId },
    req.body,
    { new: true, upsert: true },
    (err, result) => 
      handleResponse(res, err, result));
};
exports.updateQuery = updateQuery;

exports.createQuery = (req, res) => {
  if (req.body.isDefault) {
    return updateQuery(req, res);
  }
  var newQuery = new Query(req.body);
  newQuery.save((err, result) => 
    handleResponse(res, err, result));
};

exports.searchQueries = (req, res) => {
  Query.find({}, (err, result) => 
    handleResponse(res, err, result));
};

let getDefaultQuery = (req, res) => {
  Query.findOne(
    { isDefault: true },
    (err, result) => 
      handleResponse(res, err, result));
};

exports.getQuery = (req, res) => {
  if (req.params.queryId === 'default') {
    return getDefaultQuery(req, res);
  }
  Query.findById(
    req.params.queryId, 
    (err, result) => 
      handleResponse(res, err, result)
  );
};

exports.getDefaultQuery = getDefaultQuery;

exports.deleteQuery = (req, res) => {
  Query.remove({
    _id: req.params.queryId
  }, 
  (err, result) => 
      handleResponse(
        res, 
        err,
        { message: 'Query successfully deleted' })
  );
};
