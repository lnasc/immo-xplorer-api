'use strict';

module.exports = function(app) {
    var queryController = require('../controllers/queryController');
    var adController = require('../controllers/adController');

    app.route('/api/ads')
        .post(adController.searchAds);

    app.route('/api/queries')
        .get(queryController.searchQueries)
        .post(queryController.createQuery);
    
    app.route('/api/tasks/:queryId')
        .get(queryController.getQuery)
        .put(queryController.updateQuery)
        .delete(queryController.deleteQuery);
};