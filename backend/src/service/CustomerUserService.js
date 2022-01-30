const CustomerUserDAO = require ('../dao/CustomerUserDAO');
const jwt = require('jsonwebtoken');
const SECRET = "ezbk";

function signIn(request, response) {

    var result = CustomerUserDAO.signIn(request, response);

    result.then(res => {
        if (res !== 0) {
            const token = jwt.sign({ userId: res }, SECRET, { expiresIn: 300 });
            return response.json({ auth: true, token: token, user: res });
        } else {
            return response.json({ auth: false, token: "Token Failed", user: 0 });    
        }
    })
    .catch(error => {
        return response.json({ auth: false, token: error + "Token Failed", user: 0 });
    });
}

function logout(request, response) {
    response.end();
}

function verifyJWT(request, response, next) {
    const token = request.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decode) => {
        if (err) return response.status(401).end();

        request.userId = decode.userId;
        next();
    })
}

module.exports = { signIn, logout, verifyJWT }