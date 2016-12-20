import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import models here
var Panel = require('./models/panel');

mongoose.Promise = global.Promise;

const app = express();

const jsonParser = bodyParser.json();

// Add API endpoints here

app.use(express.static(process.env.CLIENT_PATH));

// const message = "Panel title";

app.get('/photos', jsonParser, function(req, res) {
    console.log("wefjnw;ln!!!")
    Panel.findOne({_id: "585968cf734d1d400d113aea" })
    .then(
      function(panel) {
        if(!panel) {
             res.status(404).send({
                message: 'Title not found'
            });
            //  return;
        }
        console.log('Panel!', panel)
        return res.status(200).json(panel);
      }).catch(function(err) {
                 res.status(500).send({
                    message: 'Internal Server Error'
                });
    })
});



// const HOST = process.env.HOST;
// const PORT = process.env.PORT || 8080;
//
// console.log(`Server running in ${process.env.NODE_ENV} mode`);
//
// function runServer() {
//     return new Promise((resolve, reject) => {
//         app.listen(PORT, HOST, (err) => {
//             if (err) {
//                 console.error(err);
//                 reject(err);
//             }
//
//             const host = HOST || 'localhost';
//             console.log(`Listening on ${host}:${PORT}`);
//         });
//     });
// }

var runServer = function(callback) {
  var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://mongodb://user:user@ds141088.mlab.com:41088/tell_your_story_app';
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
