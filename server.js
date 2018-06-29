const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db;
const http = require('http');



const server = http.createServer(app);



MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
    if (err) return console.log(err)
    db = client.db('EmpExpense') // whatever your database name is
    
  })

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}))

  app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', '*');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

  app.get('/Expense', (req, res) => {
    db.collection('ExpenseData').find().toArray(function(err, results) {
        res.send(results)
        // send HTML file populated with quotes here
      })
  })

  app.get('/Expense/:id',(req, res) => {
        var id = req.params.id;
        console.log('Retrieving wine: ' + id);
        db.collection('ExpenseData', function(err, collection) {
        collection.findOne({'SSN':(id)}, function(err, item) {
        res.send(item);
        });
    });
}) ;



//   app.get('/ExpenseData/', (req, res) => {
//     connection((db) => {
//         db.collection('ExpenseData').find('SSN').toArray().then(
//             ExpenseData => {
//                 response.data = ExpenseData;
//                 res.send(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

  

const port = process.env.PORT || '3000';



app.listen(3000, '10.102.8.203'
//     function() 
// {
//     console.log('listening on 3000')
//   }

)