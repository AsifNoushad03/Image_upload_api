const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../Models/imageModel')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }

  const image = new Image({
    name: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype
  });

  image.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Image uploaded and saved to the database.');
  });
});


router.get('/image/:id', (req, res) => {
    Image.findById(req.params.id, (err, image) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!image) {
        return res.status(404).send('Image not found.');
      }
      res.contentType(image.contentType);
      res.send(image.data);
    });
  });
  
module.exports = router;
