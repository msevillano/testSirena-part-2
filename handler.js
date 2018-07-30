const request = require('request');

const SERVER_IP = process.env.SERVERIP;

module.exports.changeMovies = async () => {
    try {
        let movies = JSON.parse(await getMovies(SERVER_IP + '/movies'));
        movies.forEach(movie => {
            deleteMovie(SERVER_IP + '/movies/', movie.title);
        });
        for (let i = 0; i < 10; i++) {
            addRandomMovie(SERVER_IP + '/movies/', generateRandomMovie());
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports.increaseViewers = async () => {
    try {
        let movies = JSON.parse(await getMovies(SERVER_IP + '/movies'));
        let movie = movies[Math.floor((Math.random() * 10))];
        movie.viewers ++;
        updateMovie(SERVER_IP + '/movies/', movie);

    } catch (err) {
        console.error(err);
    }
};

module.exports.generateStats = async () => {

    try {
        let movies = JSON.parse(await getMovies(SERVER_IP + '/movies'));
        movies.sort((a, b) => {return b.viewers - a.viewers});
        while (movies.length > 5) {
            movies.pop();
        }
        return movies;
    } catch (err) {
        console.error(err);
    }
};

function getMovies (url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(err);
            }
        });
    });
}

function addRandomMovie (url, newMovie) {
    return new Promise((resolve, reject) => {
        request({url: url,
            method: 'POST',
            json: newMovie
        },(err, res) =>  {
            if (!err && res.statusCode === 201) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

function updateMovie (url, newMovie) {
    return new Promise((resolve, reject) => {
        request({url: url + newMovie.title,
            method: 'PUT',
            json: newMovie
        },(err, res) =>  {
            if (!err && res.statusCode === 200) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

function deleteMovie(url, title) {
    return new Promise((resolve, reject) => {
        request({url: url + title,
            method: 'DELETE'
        },(err, res) =>  {
            if (!err && res.statusCode === 200) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

function generateRandomMovie() {
    return {
        "title": Math.random().toString(36).replace(/[^a-z]+/g, ''),
        "premiere": new Date().toDateString(),
        "director": Math.random().toString(36).replace(/[^a-z]+/g, ''),
        "actors": [Math.random().toString(36).replace(/[^a-z]+/g, ''),Math.random().toString(36).replace(/[^a-z]+/g, ''),Math.random().toString(36).replace(/[^a-z]+/g, '')],
        "viewers": 0
    };
}
