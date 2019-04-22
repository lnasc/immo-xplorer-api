'use strict';

function QueryRepository(queryModel) {
  this.queryModel = queryModel;
}

function handleResponse(res, err, result) {
  if (err) {
    res.send(err);
    return;
  }
  res.json(result);
}

Object.assign(QueryRepository.prototype, {
  searchQueries: function(req, res) {
    if (!req || !res) {
      throw new Error("req and res parameters must be defined");
    }
    this.queryModel.find({}, (err, result) => 
      handleResponse(res, err, result));
  },
  
  getDefaultQuery: function(req, res) {
    if (!req || !res) {
      throw new Error("req and res parameters must be defined");
    }
    this.queryModel.findOne(
      { isDefault: true },
      (err, result) => 
        handleResponse(res, err, result));
  },
  
  getQuery: function(req, res) {
    if (!req || !res) {
      throw new Error("req and res parameters must be defined");
    }
    if (!req.params || !req.params.queryId) {
      throw new Error("queryId parameter must be defined");
    }
    if (req.params.queryId === 'default') {
      return this.getDefaultQuery(req, res);
    }
    this.queryModel.findById(
      req.params.queryId, 
      (err, result) => 
        handleResponse(res, err, result)
    );
  },

  updateQuery: function(req, res) {
    if (!req || !res) {
      throw new Error("req and res parameters must be defined");
    }
    if (!req.body) {
      throw new Error("request body must be defined");
    }
    if (!req.body.isDefault && (!req.params || !req.params.queryId)) {
      throw new Error("queryId parameter must be defined or isDefault field must be set to true");
    }
    this.queryModel.findOneAndUpdate(
      req.body.isDefault 
        ? { isDefault: true }
        : { _id: req.params.queryId },
      req.body,
      { new: true, upsert: true },
      (err, result) => 
        handleResponse(res, err, result));
  },
  
  createQuery: function (req, res) {
    if (!req || !res) {
      throw new Error("req and res parameters must be defined");
    }
    if (!req.body) {
      throw new Error("request body must be defined");
    }
    if (req.body.isDefault) {
      return this.updateQuery(req, res);
    }
    var newQuery = new this.queryModel(req.body);
    newQuery.save(newQuery, (err, result) => 
      handleResponse(res, err, result));
  },
  
  deleteQuery: function(req, res) {
    if (!req || !res) {
      throw new Error("req and res parameters must be defined");
    }
    this.queryModel.remove({
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
