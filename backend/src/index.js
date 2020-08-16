const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const port = 3333;

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

app.listen(port, () => console.log("Backend executando na porta: " + port));