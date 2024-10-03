const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

//connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//checking if there is connection
db.connect((err) => {
    if(err) return console.log("error connecting");

    console.log("connected successfully, ID: ", db.threadId);
});


//question 1 goes here

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// using the patients.ejs file in the views folder 

app.get('/patients', (req,res) => {

    // Retrieving data from database 
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Displaying the records to the browser 
            res.render('patients', {results: results});
        }
    });
});



// Question 2 goes here

// using the providers file in the views folder
app.get('/providers', (req,res) => {

    // Retrieving data from database 
    db.query('SELECT * FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Displaying the records to the browser 
            res.render('providers', {results: results});
        }
    });
});

// Question 3 goes here
app.get('/patients-by-first-name', (req, res) => {
    const firstName = req.query.firstName;

   // using the patients-by-first-name file in the views folder

    const query = 'SELECT * FROM patients WHERE first_name IS NOT_NULL';
    
    db.query('SELECT * FROM patients', (error, results) => {
        if (error) {
            return res.status(500).send({ error: 'Database query failed' });
        }
        res.render('patients-by-first-name', { results: results });
    });
});

// Question 4 goes here
app.get('/providers-by-specialty', (req, res) => {
    const firstName = req.query.specialty;

   // using the providers-by-specialty 

    const query = 'SELECT * FROM providers WHERE first_name IS NOT_NULL';
    
    db.query('SELECT * FROM providers', (error, results) => {
        if (error) {
            return res.status(500).send({ error: 'Database query failed' });
        }
        res.render('providers-by-specialty', { results: results });
    });
});


// listen
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`)

   // Send a message to the browser 
   console.log('Sending message to browser...');
   app.get('/', (req,res) => {
       res.send('Server Started Successfully!');
   });

});