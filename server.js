const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb'); //object destructuring from const MongoClient = require("mongodb").MongoClient;
const { deepStrictEqual } = require('assert');
const app = express();


connectionString = "mongodb+srv://vkondac:Opethodamsam99@vanjatest1.gi8tmej.mongodb.net/?retryWrites=true&w=majority&authMechanism=DEFAULT"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/templates/views'));


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('tasks');
    const tasks = db.collection('tasks');
   

    app.get('/', (req,res) =>{
    tasks.find().toArray()
    .then(results => {
      res.render('index.ejs', {tasks : results});
      console.log(results);
    })
    .catch(error => console.log(error))
   
})



    app.post('/tasks', (req, res) => {
        tasks.insertOne(req.body)
          .then(result => {
            res.redirect('/');
            console.log(result);
          })
          .catch(error => console.error(error))
      })

      
       
      

  })
  .catch(error => console.error(error))
















app.listen(3000,() => {
    console.log('server is up on port 3000');
})






