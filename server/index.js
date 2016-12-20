import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// Mongoose
import Panel from './models/panel'
import Message from './models/message'

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

mongoose.Promise = global.Promise

const app = express();
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
const jsonParser = bodyParser.json();

app.use(express.static(process.env.CLIENT_PATH));

// ============ Panel ================

// get all panels
app.get('/panel', jsonParser, (req, res) => {
    console.log('Get panel called')
    Panel.find({}, (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        console.log('Get panel: ', data)
        res.json(data)
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

app.delete('/panel/:id', (req, res) => {
  Panel.findByIdAndRemove(req.params.id)
    .then(() => res.status(200))
    .catch(err => console.log('delete error'))
})

const DB_URL = 'mongodb://user:user@ds141088.mlab.com:41088/tell_your_story_app'
mongoose.connect(DB_URL)

function runServer() {

    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}

if (require.main === module) {
    runServer();
}

const message = "Panel title";

app.get('/photos', function(req, res) {
    console.log('server reached')
    res.status(200).json(message);
})
