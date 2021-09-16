const utilsService = require('../service/UtilsService');

function checkCriminalAntecendents() {
    utilsService.checkCriminalAntecendents();
}

module.exports = { checkCriminalAntecendents };