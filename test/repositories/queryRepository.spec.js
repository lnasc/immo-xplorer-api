var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');
var QueryRepository = require('../../src/repositories/queryRepository').QueryRepository;
var queryRepository = null;


describe('QueryRepository', function() {
    beforeEach(function queryRepositoryBeforeEach() {
        queryModel = {
            find: sinon.spy()
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
           // res.json.notCalled.should.be.true;
            res.send.firstCall.args[0].should.equals(expectedError);
        });
    });
    describe('GetQuery', function() {
        it('should get a query', function() {
            throw({});
        });
    });
    describe('GetDefaultQuery', function() {
        it('should get a default query', function() {
            throw({});
        });
    });
    describe('UpdateQuery', function() {
        it('should update a query', function() {
            throw({});
        });
    });
    describe('CreateQuery', function() {
        it('should create a query', function() {
            throw({});
        });
    });
    describe('DeleteQuery', function() {
        it('should delete a query', function() {
            throw({});
        });
    });
});