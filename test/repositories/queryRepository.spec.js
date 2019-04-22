var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');
var QueryRepository = require('../../src/repositories/queryRepository').QueryRepository;
var queryRepository = null;


describe('QueryRepository', function() {
    beforeEach(function queryRepositoryBeforeEach() {
        queryModel = {
            find: sinon.spy(),
            findOne: sinon.spy(),
            findById: sinon.spy(),
            findOneAndUpdate: sinon.spy()
        };
        queryRepository = new QueryRepository(queryModel);
    });
    describe('searchQueries', function() {
        it('should throw an error if req or res parameters are not defined', function() {
            expect(() => queryRepository.searchQueries()).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.searchQueries(null, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.searchQueries({}, undefined)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.searchQueries({}, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.searchQueries(undefined, {})).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.searchQueries(null, {})).to.throw('req and res parameters must be defined');
        });
        it('should call the find method to retrieve the queries', function() {
            queryRepository.searchQueries({}, {});
            queryModel.find.calledOnce.should.be.true;
            queryModel.find.firstCall.args[0].should.deep.equals({});
        });
        it('should return the queries as json if there were no errors', function() {
            var req = {};
            var res = {
                send: sinon.spy(),
                json: sinon.spy()
            };
            queryRepository.searchQueries(req, res);
            let callback = queryModel.find.firstCall.args[1];
            let expectedResult = { toto: 'toto' };
            callback(null, expectedResult);
            res.json.calledOnce.should.be.true;
            res.send.notCalled.should.be.true;
            res.json.firstCall.args[0].should.equals(expectedResult);
        });
        it('should return error if any', function() {
            var req = {};
            var res = {
                send: sinon.spy(),
                json: sinon.spy()
            };
            queryRepository.searchQueries(req, res);
            let callback = queryModel.find.firstCall.args[1];
            let expectedError = { toto: 'toto' };
            callback(expectedError, null);
            res.send.calledOnce.should.be.true;
            res.json.notCalled.should.be.true;
            res.send.firstCall.args[0].should.equals(expectedError);
        });
    });
    describe('getDefaultQuery', function() {
        it('should throw an error if req or res parameters are not defined', function() {
            expect(() => queryRepository.getDefaultQuery()).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getDefaultQuery(null, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getDefaultQuery({}, undefined)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getDefaultQuery({}, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getDefaultQuery(undefined, {})).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getDefaultQuery(null, {})).to.throw('req and res parameters must be defined');
        });
        it('should call the findOne method to retrieve the query', function() {
            queryRepository.getDefaultQuery({}, {});
            queryModel.findOne.calledOnce.should.be.true;
            queryModel.findOne.firstCall.args[0].should.deep.equals({
                isDefault: true
            });
        });
        it('should call the findOne method to retrieve the query', function() {
            queryRepository.getDefaultQuery({}, {});
            queryModel.findOne.calledOnce.should.be.true;
            queryModel.findOne.firstCall.args[0].should.deep.equals({
                isDefault: true
            });
        });
        it('should return the queries as json if there were no errors', function() {
            var req = {};
            var res = {
                send: sinon.spy(),
                json: sinon.spy()
            };
            queryRepository.getDefaultQuery(req, res);
            let callback = queryModel.findOne.firstCall.args[1];
            let expectedResult = { toto: 'toto' };
            callback(null, expectedResult);
            res.json.calledOnce.should.be.true;
            res.send.notCalled.should.be.true;
            res.json.firstCall.args[0].should.equals(expectedResult);
        });
        it('should return error if any', function() {
            var req = {};
            var res = {
                send: sinon.spy(),
                json: sinon.spy()
            };
            queryRepository.getDefaultQuery(req, res);
            let callback = queryModel.findOne.firstCall.args[1];
            let expectedError = { toto: 'toto' };
            callback(expectedError, null);
            res.send.calledOnce.should.be.true;
            res.json.notCalled.should.be.true;
            res.send.firstCall.args[0].should.equals(expectedError);
        });
    });
    describe('getQuery', function() {
        it('should throw an error if req or res parameters are not defined', function() {
            expect(() => queryRepository.getQuery()).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getQuery(null, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getQuery({}, undefined)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getQuery({}, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getQuery(undefined, {})).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.getQuery(null, {})).to.throw('req and res parameters must be defined');
        });
        it('should return error if queryId is not specified', function() {
            expect(() => queryRepository.getQuery({}, {})).to.throw('queryId parameter must be defined');
        });
        describe('if queryId is set to default', function() {
            it('should call getDefaultQuery', function() {
                var req = {
                    params: {
                        queryId: 'default'
                    }
                };
                queryRepository.getQuery(req, {});
                queryModel.findOne.calledOnce.should.be.true;
                queryModel.findById.notCalled.should.be.true;
                queryModel.findOne.firstCall.args[0].should.deep.equals({
                    isDefault: true
                });
            });
            it('should return the query as json if there were no errors', function() {
                var req = {
                    params: {
                        queryId: 'default'
                    }
                };
                var res = {
                    send: sinon.spy(),
                    json: sinon.spy()
                };
                queryRepository.getQuery(req, res);
                var callback = queryModel.findOne.firstCall.args[1];
                let expectedResult = { toto: 'toto' };
                callback(null, expectedResult);
                res.json.calledOnce.should.be.true;
                res.send.notCalled.should.be.true;
                res.json.firstCall.args[0].should.equals(expectedResult);
            });
            it('should return error if any', function() {
                var req = {
                    params: {
                        queryId: 'default'
                    }
                };
                var res = {
                    send: sinon.spy(),
                    json: sinon.spy()
                };
                queryRepository.getQuery(req, res);
                let callback = queryModel.findOne.firstCall.args[1];
                let expectedError = { toto: 'toto' };
                callback(expectedError, null);
                res.send.calledOnce.should.be.true;
                res.json.notCalled.should.be.true;
                res.send.firstCall.args[0].should.equals(expectedError);
            });
        });
        describe('if queryId is not set to default', function() {
            it('should call findById to retrieve the query', function() {
                var req = {
                    params: {
                        queryId: 42
                    }
                };
                queryRepository.getQuery(req, {});
                queryModel.findById.calledOnce.should.be.true;
                queryModel.findOne.notCalled.should.be.true;
                queryModel.findById.firstCall.args[0].should.equals(req.params.queryId);
            });
            it('should return the query as json if there were no errors', function() {
                var req = {
                    params: {
                        queryId: 42
                    }
                };
                var res = {
                    send: sinon.spy(),
                    json: sinon.spy()
                };
                queryRepository.getQuery(req, res);
                var callback = queryModel.findById.firstCall.args[1];
                let expectedResult = { toto: 'toto' };
                callback(null, expectedResult);
                res.json.calledOnce.should.be.true;
                res.send.notCalled.should.be.true;
                res.json.firstCall.args[0].should.equals(expectedResult);
            });
            it('should return error if any', function() {
                var req = {
                    params: {
                        queryId: 42
                    }
                };
                var res = {
                    send: sinon.spy(),
                    json: sinon.spy()
                };
                queryRepository.getQuery(req, res);
                let callback = queryModel.findById.firstCall.args[1];
                let expectedError = { toto: 'toto' };
                callback(expectedError, null);
                res.send.calledOnce.should.be.true;
                res.json.notCalled.should.be.true;
                res.send.firstCall.args[0].should.equals(expectedError);
            });
        });
    });
    describe('updateQuery', function() {
        it('should throw an error if req or res parameters are not defined', function() {
            expect(() => queryRepository.updateQuery()).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.updateQuery(null, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.updateQuery({}, undefined)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.updateQuery({}, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.updateQuery(undefined, {})).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.updateQuery(null, {})).to.throw('req and res parameters must be defined');
        });
        it('should throw an error if body is not defined', function() {
            expect(() => queryRepository.updateQuery({}, {})).to.throw('body must be defined');
        });
        it('should throw an error if queryId parameter is not defined', function() {
            expect(() => queryRepository.updateQuery({ body: {} }, {})).to.throw('queryId parameter must be defined');
        });
        it('should call findOneAndUpdate to update the default query', function() {
            var req = {
                params: {
                    queryId: 42
                },
                body: {
                    isDefault: true,
                    toto: 42
                }
            };
            queryRepository.updateQuery(req, {});
            queryModel.findOneAndUpdate.calledOnce.should.be.true;
            queryModel.findOneAndUpdate.firstCall.args[0].should.deep.equals({ isDefault: true });
            queryModel.findOneAndUpdate.firstCall.args[1].should.equals(req.body);
            queryModel.findOneAndUpdate.firstCall.args[2].should.deep.equals({ new: true, upsert: true });
        });
        it('should call findOneAndUpdate to update a regular query', function() {
            var req = {
                params: {
                    queryId: 42
                },
                body: {
                    toto: 42
                }
            };
            queryRepository.updateQuery(req, {});
            queryModel.findOneAndUpdate.calledOnce.should.be.true;
            queryModel.findOneAndUpdate.firstCall.args[0].should.deep.equals({ _id: req.params.queryId });
            queryModel.findOneAndUpdate.firstCall.args[1].should.equals(req.body);
            queryModel.findOneAndUpdate.firstCall.args[2].should.deep.equals({ new: true, upsert: true });
        });
        it('should return the updated query as json if there were no errors', function() {
            var req = {
                params: {
                    queryId: 42
                },
                body: {
                    toto: 42
                }
            };
            var res = {
                send: sinon.spy(),
                json: sinon.spy()
            };
            queryRepository.updateQuery(req, res);
            let callback = queryModel.findOneAndUpdate.firstCall.args[3];
            let expectedResult = { toto: 'toto' };
            callback(null, expectedResult);
            res.json.calledOnce.should.be.true;
            res.send.notCalled.should.be.true;
            res.json.firstCall.args[0].should.equals(expectedResult);
        });
        it('should return error if any', function() {
            var req = {
                params: {
                    queryId: 42
                },
                body: {
                    toto: 42
                }
            };
            var res = {
                send: sinon.spy(),
                json: sinon.spy()
            };
            queryRepository.updateQuery(req, res);
            let callback = queryModel.findOneAndUpdate.firstCall.args[3];
            let expectedError = { toto: 'toto' };
            callback(expectedError, null);
            res.send.calledOnce.should.be.true;
            res.json.notCalled.should.be.true;
            res.send.firstCall.args[0].should.equals(expectedError);
        });
    });
    describe('createQuery', function() {
        it('should throw an error if req or res parameters are not defined', function() {
            expect(() => queryRepository.createQuery()).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.createQuery(null, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.createQuery({}, undefined)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.createQuery({}, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.createQuery(undefined, {})).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.createQuery(null, {})).to.throw('req and res parameters must be defined');
        });
        it('should throw an error if body is not defined', function() {
            expect(() => queryRepository.createQuery({}, {})).to.throw('request body must be defined');
        });
        it('should call findOneAndUpdate to update the default query', function() {
            var req = {
                body: {
                    isDefault: true,
                    toto: 42
                }
            };
            queryRepository.createQuery(req, {});
            queryModel.findOneAndUpdate.calledOnce.should.be.true;
            queryModel.findOneAndUpdate.firstCall.args[0].should.deep.equals({ isDefault: true });
            queryModel.findOneAndUpdate.firstCall.args[1].should.equals(req.body);
            queryModel.findOneAndUpdate.firstCall.args[2].should.deep.equals({ new: true, upsert: true });
        });
    });
    describe('deleteQuery', function() {
        it('should throw an error if req or res parameters are not defined', function() {
            expect(() => queryRepository.deleteQuery()).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.deleteQuery(null, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.deleteQuery({}, undefined)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.deleteQuery({}, null)).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.deleteQuery(undefined, {})).to.throw('req and res parameters must be defined');
            expect(() => queryRepository.deleteQuery(null, {})).to.throw('req and res parameters must be defined');
        });
    });
});