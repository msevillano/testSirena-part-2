process.env.NODE_ENV = 'test';
process.env.SERVERIP = 'http://localhost:3000';

const chai = require('chai');
const should = chai.should();
const nock = require('nock');

let api1 = nock(process.env.SERVERIP)
    .get('/movies/')
    .reply(200, [
        {
            "actors": [
                "ywknirn",
                "gczqzne",
                "qjmlhysn"
            ],
            "_id": "5b5ceb9a929eb815f6cda063",
            "title": "lzjck",
            "premiere": "2018-07-28T03:00:00.000Z",
            "director": "ygerhnwwxp",
            "viewers": 0,
            "__v": 0
        }
    ]);

let api2 = nock(process.env.SERVERIP)
    .get('/movies/:title')
    .reply(200,
        {
            "actors": [
                "ywknirn",
                "gczqzne",
                "qjmlhysn"
            ],
            "_id": "5b5ceb9a929eb815f6cda063",
            "title": "lzjck",
            "premiere": "2018-07-28T03:00:00.000Z",
            "director": "ygerhnwwxp",
            "viewers": 0,
            "__v": 0
        }
    );

let api3 = nock(process.env.SERVERIP)
    .post('/movies/')
    .reply(201, {});

let api4 = nock(process.env.SERVERIP)
    .put('/movies/:title')
    .reply(200, {});

let api5 = nock(process.env.SERVERIP)
    .delete('/movies/:title')

    .reply(200, {});

const handler = require('../handler.js');


describe('Handler tests', () => {

    describe('onStart method', () => {

        it('Should populate te DB with 10 movies', done => {
            handler.onStart().should.equal(0);

            done()
        });
    });

    describe('increaseViewers method', () => {

        it('Should add viewers to a movie', done => {
            handler.increaseViewers().should.equal(0);

            done()
        });
    });

    describe('increaseViewers method', () => {

        it('Should return stats', done => {
            handler.generateStats().should.equal(0);

            done()
        });
    });

    describe('cangeMovies method', () => {

        it('Should change the movies', done => {
            handler.changeMovies().should.equal(0);

            done()
        });
    });
});