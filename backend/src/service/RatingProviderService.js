const RatingProviderDAO = require('../dao/RatingProviderDAO');

async function getRatings(request, response) {
    RatingProviderDAO.getRatings(request, response);
}

module.exports = { getRatings }