'use strict';

module.exports = function(app) {
    var QueryRepository = require('../controllers/queryController').QueryRepository;
    var adController = require('../controllers/adController');

    var queryRepository = new QueryRepository();

    app.route('/')
        .get((req, res) => res.status(200).send('hello'));

    app.route('/api/ads')
        .post(adController.searchAds.bind(queryRepository));

    app.route('/api/queries')
        .get(queryRepository.searchQueries.bind(queryRepository))
        .post(queryRepository.createQuery.bind(queryRepository));
    
    app.route('/api/queries/:queryId')
        .get(queryRepository.getQuery.bind(queryRepository))
        .put(queryRepository.updateQuery.bind(queryRepository))
        .delete(queryRepository.deleteQuery.bind(queryRepository));
};