const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express');
const app = express();
const mockAPIResponse = require('./mockAPI');

/* Body Parser Dependencies*/
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json());

//CORS for cross origin allowance
const cors = require('cors');
const Person = require('./mockAPI');
const { response } = require('express');
app.use(cors());

app.use(express.static('dist'));

//CREATE LOCAL SERVER
const port = 8081;

const server= app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('dist/index.html'));
 //res.send("hello Worldie")
 //res.send('dist/index.html');
})


app.get('/AylienDataRoute', getAylienData)

//Get Route 1
function getAylienData(req, res) {
  //res.send(response);  
 };


 app.post('/AylienDataRoute', aylienRequest, postAylienData);
 function aylienRequest(req, res, next) {
  if(!req.body.text ) {
      return res.status(400).json({
         message: 'Invalid input'
      })
  } 
  return next();
}


 //AylienData POST Route
 function postAylienData(req, res, next) {

  var aylien = require("aylien_textapi");

  var textapi = new aylien({
    application_id: "a0a39660",
    application_key: "bec52b6ed0e0064beb80060a45163d06"
  });

  textapi.sentiment({
    'text': req.body.text,
    'polarity':req.body.polarity,
    'subjectivity':req.body.subjectivity,
    'polarity_confidence': req.body.polarity_confidence,
    'subjectivity_confidence':req.body.subjectivity_confidence
  }, function(error, response) {
    if (error === null) {
      res.send(response);
    // console.log(response);
     return response;
    }
    return response;
  });
}
