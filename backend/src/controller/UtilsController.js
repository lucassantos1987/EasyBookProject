const UtilsService = require('../service/UtilsService');

async function uploadPhotoProfile(request, response) {
    UtilsService.uploadPhotoProfile(request, response);
}

module.exports = { uploadPhotoProfile }