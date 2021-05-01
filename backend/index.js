const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { response } = require('express');

const port = 3333;
const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../../photosprofileeasybook');
    },
    filename: function (req, file, cb) {
        let ext = '';
        if (file.originalname.split('.').length > 1) 
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({ storage: storage });

var uploadFolder = path.join(__dirname, '..', '..', '..', 'photosprofileeasybook');

app.use('/photosprofileeasybook', express.static(uploadFolder));

app.post('/photosprofileeasybook', upload.single('image'), async (req, res) => {
    const { filename: file } = req.file;

    if (file) {
        await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 50 })
        .toFile(
            path.resolve(req.file.destination, 'resized', file)
        )
        .then(response => {          
            return res.json({ 
                file: req.file.filename,
                success: true
            });

        })
        .catch(error => {
            console.log("Error Resized: " + error)
            return res.json({  
                file: "Failed",
                success: false
            });    
        })

        fs.unlinkSync(req.file.path);

    } else {
        console.log("File Not Uploaded");
        return res.json({  
            file: "Failed",
            success: false
        });
    }
})

app.listen(port, () => console.log("Backend executando na porta: " + port));