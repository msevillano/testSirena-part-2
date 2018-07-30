const request = require('request');

const SERVER_IP = process.env.SERVERIP;

module.exports.onStart = () => {
    let response = 0;

    try {
        request(SERVER_IP + '/movies', (err, res, body) => {
            if (err) throw err;
            if (res.status !== 200) response = 1;
            let movies = JSON.parse(body);
            movies.forEach(movie => {
                request({url: SERVER_IP + '/movies/'+ movie.title,
                    method: 'DELETE'
                }, (err, res) => {
                    if(err) throw err;
                    if (res.status !== 200) response = 1;
                });
            });

            for (let i = 0; i < 10; i++) {
                let newMovie = generateRandomMovie();
                request({url: SERVER_IP + '/movies/',
                    method: 'POST',
                    json: newMovie
                }, (err, res) => {
                    if(err) throw err;
                    if (res.status !== 201) response = 1;
                });
            }
        });
        return response;
    } catch (err) {
        console.log(err);
        return 1;
    }
};

module.exports.increaseViewers = () => {
    let response = 0;
    try {
        request(SERVER_IP + '/movies', (err, res, body) => {
            if (err) throw err;
            if (res.status !== 200) response = 1;
            let movies = JSON.parse(body);
            let movie = movies[Math.floor((Math.random() * 10))];
            movie.viewers ++;
            request({url: SERVER_IP + '/movies/'+ movie.title,
                     method: 'PUT',
                     json: movie
                    }, (err, res) => {
                if(err) throw err;
                if (res.status !== 200) response = 1;
            });
        });
        return response;
    } catch (err) {
        console.log(err);
        return 1;
    }
};

module.exports.generateStats = () => {
    let response = 0;
    try {

        request(SERVER_IP + '/movies', (err, res, body) => {
            if (err) throw err;
            if (res.status !== 200) response = 1;
            let movies = JSON.parse(body);
            movies.sort((a, b) => {return b.viewers - a.viewers});
            while (movies.length > 5) {
                movies.pop();
            }
           response = movies;
        });
        return response;
    } catch (err) {
        console.log(err);
        return 1;
    }
};

module.exports.changeMovies = () => {
    let response = 0;

    try {
        request(SERVER_IP + '/movies', (err, res, body) => {
            if (err) throw err;
            if (res.status !== 200) response = 1;
            let movies = JSON.parse(body);
            movies.forEach(movie => {
                request({
                    url: SERVER_IP + '/movies/' + movie.title,
                    method: 'DELETE'
                });
                let newMovie = generateRandomMovie();
                request({
                    url: SERVER_IP + '/movies/',
                    method: 'POST',
                    json: newMovie
                }, (err, res) => {
                    if (err) throw err;
                    if (res.status !== 200) response = 1;
                });
            });
        });
    return response;
    } catch (err) {
        console.log(err);
        return 1;
    }
};

function generateRandomMovie() {
    return {
        "title": Math.random().toString(36).replace(/[^a-z]+/g, ''),
        "premiere": new Date().toDateString(),
        "director": Math.random().toString(36).replace(/[^a-z]+/g, ''),
        "actors": [Math.random().toString(36).replace(/[^a-z]+/g, ''),Math.random().toString(36).replace(/[^a-z]+/g, ''),Math.random().toString(36).replace(/[^a-z]+/g, '')],
        "viewers": 0
    };
}
