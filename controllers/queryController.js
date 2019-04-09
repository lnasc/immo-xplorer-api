'use strict';


var mongoose = require('mongoose'),
    Query = mongoose.model('Queries');

exports.searchQueries = function(req, res) {
    Query.find({}, function(err, query) {
    if (err)
      res.send(err);
    res.json(query);
  });
};

exports.createQuery = function(req, res) {
  var newQuery = new Query(req.body);
  newQuery.save(function(err, query) {
    if (err)
      res.send(err);
    res.json(query);
  });
};


exports.getQuery = function(req, res) {
  Query.findById(req.params.queryId, function(err, query) {
    if (err)
      res.send(err);
    res.json(query);
  });
};


exports.updateQuery = function(req, res) {
  Query.findOneAndUpdate({_id: req.params.queryId}, req.body, {new: true}, function(err, query) {
    if (err)
      res.send(err);
    res.json(query);
  });
};


exports.deleteQuery = function(req, res) {
  Query.remove({
    _id: req.params.queryId
  }, function(err, query) {
    if (err)
      res.send(err);
    res.json({ message: 'Query successfully deleted' });
  });
};
