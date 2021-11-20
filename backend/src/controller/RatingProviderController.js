const RatingPRoviderService = require('../service/RatingProviderService');

async function getRatings(request, response) {
    RatingPRoviderService.getRatings(request, response);
}

module.exports = { getRatings }