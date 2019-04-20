'use strict';

module.exports = function(app) {
    var mongoose = require('mongoose'),
        queryModel = mongoose.model('Queries'),
        adRepository = require('../repositories/adRepository'),
        QueryRepository = require('../repositories/queryRepository').QueryRepository;

    var queryRepository = new QueryRepository(queryModel);

    app.route('/')
        .get((req, res) => res.status(200).send('hello'));

    app.route('/api/ads')
        .post(adRepository.searchAds.bind(queryRepository));

    app.route('/api/queries')
        .get(queryRepository.searchQueries.bind(queryRepository))
        .post(queryRepository.createQuery.bind(queryRepository));
    
    app.route('/api/queries/:queryId')
        .get(queryRepository.getQuery.bind(queryRepository))
        .put(queryRepository.updateQuery.bind(queryRepository))
        .delete(queryRepository.deleteQuery.bind(queryRepository));
};