const RatingPRoviderService = require('../service/RatingProviderService');

async function getRatings(request, response) {
    RatingPRoviderService.getRatings(request, response);
}

async function saveRating(request, response) {
    RatingPRoviderService.saveRating(request, response);
}

module.exports = { getRatings, saveRating }