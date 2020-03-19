var express = require('express');
var router = express.Router();
var fs = require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'La Cabine à Photos' });
});

router.get('/photo', function(req, res, next) {
  res.render('photo', { title: 'La Cabine à Photos' });
});

router.post('/shoot', function(req, res, next) {
  var data = req.body.image

  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};
    
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
    
    return response;
  }
  
  var imageBuffer = decodeBase64Image(data);
  var date = new Date()
  var timestamp = date.getTime()

  fs.writeFileSync(`./public/images/${timestamp}.jpeg`, imageBuffer.data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });

  res.json({ filename: timestamp });

});

router.get('/rendu/:filename', function(req, res, next){
  let filename = req.params.filename

  res.render('rendu', { title: 'La Cabine à Photos', image: filename })
});

module.exports = router;
