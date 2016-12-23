import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import crypto from 'crypto'

// Mongoose
import Panel from './models/panel'
import Message from './models/message'

mongoose.Promise = global.Promise

const app = express();

const jsonParser = bodyParser.json();

// Add API endpoints here

app.use(express.static(process.env.CLIENT_PATH));


// CLOUDINARY_API_KEY=284981691241697
// CLOUDINARY_API_SECRET=X3Zzl3UWFCdbWfnSCHDWcZropUM

// app.post('/photos', jsonParser, (req, res) => {
//   const publicId = req.body.public_id; 
//   const timestamp = Date.now();
//   const apiSecret = CLOUDINARY_API_SECRET; 
//   const signatureToSign = `public_id=$(publicId)&timestamp=$(timestamp)`
//   const signature = crypto.makeSha1Digest(signatureToSign)
//   res.send

// })

// endpoint for getting signatures for uplodaing to cloudinary
// process.env.CLOUDINARY_API_KEY
// process.env.CLOUDINARY_API_SECRET
// app.post, jsonParser =>
  // publicId = req.body.public_id
  // timestamp = Date.now()
  // apiSecret = process.env.CLODINARY_API_SECRET
  // var signatureToSign = `public_id=${publicId}&timestamp=1315060510abcd` etc...
  // var signature = crypto.makeSha1Digest(signatureToSign)
  // 1784123fdba7637176
  // "public_id=sample_image&timestamp=1315060510abcd"



// Docs from cloudinary:
//    All parameters should be included except the file, type, and resource_typeparameters, and the api_key.
//    Make sure to include the timestamp.
//    Sort the parameters by their names in alphabetical order.
//    Separate the parameter names from their values with an = and join the parameter/value pairs together with an &.

// ============ Panel ================

// get all panels
app.get('/panel', jsonParser, (req, res) => {
    console.log('Get panel called')
    Panel.find({}, (err, data) => {
        if (err) {
          console.log('error was made')
            console.log(err)
            res.send(err)
        }
        res.status(200).json(data)
    })
})

// get individual panel
app.get('/panel/:id', jsonParser, (req, res) => {
  console.log('Get panel id: ', req.params);
  Panel.findById({_id: req.params.id}, (err, data) => {
    if (err) {
        console.log(err)
        res.send(err)
    }
    // console.log('Get panel: ', data)
    res.status(200).json(data)
  })
})

let panelObj = {
  filter: "grayscale",
	text: "Caption 2",
	imgUrl: "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
	edits: true
}

// create panel
app.post('/panel', jsonParser, (req, res) => {
  console.log(req.body)
  Panel.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err))
  // res.status(200)
})

// put panel
app.put('/panel/:id', jsonParser, (req, res) => {
  const { id } = req.params
  const { body } = req
  console.log(id)
  Panel.findByIdAndUpdate(id, body)
    .then(data => res.status(200).end())
    .catch(err => console.log(err))
})

// delete panel

app.delete('/panel/:id', (req, res) => {
  Panel.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch(err => console.log('delete error'))
})

var runServer = function(callback) {
  var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://user:user@ds141128.mlab.com:41128/tell_your_story_app_carlo';
  mongoose.connect(databaseUri)
  .then(() => {
    var port = process.env.PORT || 8080;
    var server = app.listen(port, () => {
        console.log('Listening on port ' + port);
        if (callback) { callback(server) };
      });
  });
};

if (require.main === module) {
    runServer();
}

exports.app = app;
exports.runServer = runServer;


