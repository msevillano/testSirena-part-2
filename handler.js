const request = require('request');

const SERVER_IP = process.env.SERVERIP;

module.exports.onStart = () => {

    request(SERVER_IP + '/movies', (err, res, body) => {
        let movies = JSON.parse(body);
        movies.forEach(movie => {
            request({url: SERVER_IP + '/movies/'+ movie.title,
                method: 'DELETE'
            });
        });

        for (let i = 0; i < 10; i++) {
            let newMovie = generateRandomMovie();
            request({url: SERVER_IP + '/movies/',
                method: 'POST',
                json: newMovie
            });
        }
    });
};

module.exports.increaseViewers = () => {

    request(SERVER_IP + '/movies', (err, res, body) => {
        let movies = JSON.parse(body);
        let movie = movies[Math.floor((Math.random() * 10))];
        movie.viewers ++;
        request({url: SERVER_IP + '/movies/'+ movie.title,
                 method: 'PUT',
                 json: movie
                });
    });
};

module.exports.generateStats = () => {

    request(SERVER_IP + '/movies', (err, res, body) => {
        let movies = JSON.parse(body);
        movies.sort((a, b) => {return b.viewers - a.viewers});
        while (movies.length > 5) {
            movies.pop();
        }
        console.log(movies);
    });
};

module.exports.changeMovies = () => {

    request(SERVER_IP + '/movies', (err, res, body) => {
        let movies = JSON.parse(body);
        movies.forEach(movie => {
            request({url: SERVER_IP + '/movies/'+ movie.title,
                method: 'DELETE'
            });
            let newMovie = generateRandomMovie();
            request({url: SERVER_IP + '/movies/',
                method: 'POST',
                json: newMovie
            });
        });
    });
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
