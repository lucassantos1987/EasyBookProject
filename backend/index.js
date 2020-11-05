const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const multer = require('multer');

//var upload = multer({ dest: '/upload' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/upload');
    },
    filename: function (req, file, cb) {
        let ext = '';
        if (file.originalname.split('.').length > 1) 
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({ storage: storage });

const fs = require('fs');
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

app.post('/upload', upload.single('image'), (req, res) => {
    /*console.log(req.file);*/

    const { file } = req;

    if (file) {
        console.log("File Uploaded");
        return res.json({ 
            file: req.file.path,
            success: true
        });
    } else {
        return res.json({  
            file: "Failed",
            success: false
        });
    }
})

app.listen(port, () => console.log("Backend executando na porta: " + port));