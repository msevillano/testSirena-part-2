process.env.NODE_ENV = 'test';
process.env.SERVERIP = 'http://localhost:3000';

const chai = require('chai');
const should = chai.should();
const nock = require('nock');

let apiGet = nock(process.env.SERVERIP).persist().get('/movies')
    .reply(200, [
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck1", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 1},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck2", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 2},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck3", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 3},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck4", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 4},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck5", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 5},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck6", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 6},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck7", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 7},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck8", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 8},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck9", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 9},
        {"actors": ["ywknirn", "gczqzne", "qjmlhysn"], "title": "lzjck0", "premiere": "2018-07-28T03:00:00.000Z", "director": "ygerhnwwxp", "viewers": 0}
    ]);
let apiDelete1 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck1').reply(200, {});
let apiDelete2 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck2').reply(200, {});
let apiDelete3 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck3').reply(200, {});
let apiDelete4 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck4').reply(200, {});
let apiDelete5 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck5').reply(200, {});
let apiDelete6 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck6').reply(200, {});
let apiDelete7 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck7').reply(200, {});
let apiDelete8 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck8').reply(200, {});
let apiDelete9 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck9').reply(200, {});
let apiDelete0 = nock(process.env.SERVERIP).persist().delete('/movies/lzjck0').reply(200, {});

let apiPut1 = nock(process.env.SERVERIP).persist().put('/movies/lzjck1').reply(200, {});
let apiPut2 = nock(process.env.SERVERIP).persist().put('/movies/lzjck2').reply(200, {});
let apiPut3 = nock(process.env.SERVERIP).persist().put('/movies/lzjck3').reply(200, {});
let apiPut4 = nock(process.env.SERVERIP).persist().put('/movies/lzjck4').reply(200, {});
let apiPut5 = nock(process.env.SERVERIP).persist().put('/movies/lzjck5').reply(200, {});
let apiPut6 = nock(process.env.SERVERIP).persist().put('/movies/lzjck6').reply(200, {});
let apiPut7 = nock(process.env.SERVERIP).persist().put('/movies/lzjck7').reply(200, {});
let apiPut8 = nock(process.env.SERVERIP).persist().put('/movies/lzjck8').reply(200, {});
let apiPut9 = nock(process.env.SERVERIP).persist().put('/movies/lzjck9').reply(200, {});
let apiPut0 = nock(process.env.SERVERIP).persist().put('/movies/lzjck0').reply(200, {});


let apiPost = nock(process.env.SERVERIP)
    .persist()
    .post('/movies/')
    .reply(201, {});

const handler = require('../handler.js');

describe('Handler tests', () => {

    describe('changeMovies method', () => {

        it('Should change the movies', done => {
            (async () => {
                let data = await handler.changeMovies();
                setTimeout(() => {
                    let statusGet = apiGet.isDone();
                    let statusDelete = (apiDelete1.isDone() && apiDelete2.isDone() && apiDelete3.isDone() && apiDelete4.isDone() && apiDelete5.isDone() && apiDelete6.isDone() && apiDelete7.isDone() && apiDelete8.isDone() && apiDelete9.isDone() && apiDelete0.isDone());
                    let statusPost = apiPost.isDone();
                    statusGet.should.equal(true);
                    statusDelete.should.equal(true);
                    statusPost.should.equal(true);
                    done();
                }, 1);
            })();
        });
    });

    describe('increaseViewers method', () => {

        it('Should add viewers to a movie', done => {
            (async () => {
                let data = await handler.increaseViewers();
                setTimeout(() => {
                    let statusGet = apiGet.isDone();
                    let statusPut = (apiPut1.isDone() || apiPut2.isDone() || apiPut3.isDone() || apiPut4.isDone() || apiPut5.isDone() || apiPut6.isDone() || apiPut7.isDone() || apiPut8.isDone() || apiPut9.isDone() || apiPut0.isDone());
                    statusGet.should.equal(true);
                    statusPut.should.equal(true);
                    done();
                }, 1);
            })();
        });
    });

    describe('generateStats method', () => {

        it('Should return stats', done => {
            (async () => {
                let data = await handler.generateStats();
                data.length.should.equal(5);
                data[0].should.include.keys('title', 'director', 'premiere', 'actors', 'viewers');
                done();
            })();
        });
    });
});
