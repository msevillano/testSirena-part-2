const request = require('request');

const SERVER_IP = process.env.SERVERIP;

/**
 * Changes the movies that are actually on the DB for 10 new movies
 */
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
/**
 * Increases the amount of viewers of a random movie by 1
 */
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
/**
 * Gets the top 5 mos tiewed movies
 *
 * @returns [Movie]
 */
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

/**
 * Gets all the movies from the DB
 * @param   {string} url of the CRUD api
 *
 * @returns [Movie] if found
 * @throws {err} in case of error while retrieving
 */
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
/**
 * Persist a random movie into the DB
 * @param   {string} url of the CRUD api
 * @param   {Movie} newMovie to persist on the DB
 *
 * @throws {err} in case of error while retrieving
 */
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
/**
 * Gets all the movies from the DB
 * @param   {string} url of the CRUD api
 * @param   {Movie} movie to update on the DB
 *
 * @throws {err} in case of error while retrieving
 */
function updateMovie (url, movie) {
    return new Promise((resolve, reject) => {
        request({url: url + movie.title,
            method: 'PUT',
            json: movie
        },(err, res) =>  {
            if (!err && res.statusCode === 200) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}
/**
 * Removes a movie from the DB
 * @param   {string} url of the CRUD api
 * @param   {string} title title of the movie to delete on the DB
 *
 * @throws {err} in case of error while retrieving
 */
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
/**
 * Generates a random movie
 *
 * @returns {Movie}
 */
function generateRandomMovie() {
    return {
        "title": Math.random().toString(36).replace(/[^a-z]+/g, ''),
        "premiere": new Date().toDateString(),
        "director": Math.random().toString(36).replace(/[^a-z]+/g, ''),
        "actors": [Math.random().toString(36).replace(/[^a-z]+/g, ''),Math.random().toString(36).replace(/[^a-z]+/g, ''),Math.random().toString(36).replace(/[^a-z]+/g, '')],
        "viewers": 0
    };
}
