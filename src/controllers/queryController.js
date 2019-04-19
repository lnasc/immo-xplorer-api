'use strict';

var mongoose = require('mongoose'),
    Query = mongoose.model('Queries');

function QueryRepository() {
}

function handleResponse(res, err, result) {
  if (err) {
    res.send(err);
  }
  res.json(result);
}

Object.assign(QueryRepository.prototype, {
  searchQueries: function(req, res) {
    Query.find({}, (err, result) => 
      handleResponse(res, err, result));
  },
  
  getDefaultQuery: function(req, res) {
    Query.findOne(
      { isDefault: true },
      (err, result) => 
        handleResponse(res, err, result));
  },
  
  getQuery: function(req, res) {
    if (req.params.queryId === 'default') {
      return this.getDefaultQuery(req, res);
    }
    Query.findById(
      req.params.queryId, 
      (err, result) => 
        handleResponse(res, err, result)
    );
  },

  updateQuery: function(req, res) {
    Query.findOneAndUpdate(
      req.body.isDefault 
        ? { isDefault: true }
        : { _id: req.params.queryId },
      req.body,
      { new: true, upsert: true },
      (err, result) => 
        handleResponse(res, err, result));
  },
  
  createQuery: function (req, res) {
    if (req.body.isDefault) {
      return this.updateQuery(req, res);
    }
    var newQuery = new Query(req.body);
    newQuery.save((err, result) => 
      handleResponse(res, err, result));
  },
  
  deleteQuery: function(req, res) {
    Query.remove({
      _id: req.params.queryId
    }, 
    (err, result) => 
        handleResponse(
          res, 
          err,
          { message: 'Query successfully deleted' })
    );
  }
});

module.exports = { QueryRepository };
