const RatingProviderDAO = require('../dao/RatingProviderDAO');

async function getRatings(request, response) {
    RatingProviderDAO.getRatings(request, response);
}

async function saveRating(request, response) {
    RatingProviderDAO.saveRating(request, response);
}

module.exports = { getRatings, saveRating }