const CustomerUserDAO = require ('../dao/CustomerUserDAO');
const jwt = require('jsonwebtoken');
const SECRET = "ezbk";

function signIn(request, response) {

    var result = CustomerUserDAO.signIn(request, response);

    result.then(res => {
        if (res !== 0) {
            const token = jwt.sign({ userId: res }, SECRET, { expiresIn: 300 });
            return response.json({ auth: true, token: token });
        } else {
            return response.json({ auth: false, token: "Token Failed" });    
        }
    })
    .catch(error => {
        return response.json({ auth: false, token: error + "Token Failed" });
    });
}

function verifyJWT(request, response, next) {
    const token = request.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decode) => {
        if (err) return response.status(401).end();

        request.userId = decode.userId;
        next();
    })
}

module.exports = { signIn, verifyJWT }