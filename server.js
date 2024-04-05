//let's define : dependencies
const express = require('express')
const bodyParser = require('body-parser') //to understand json data body-parser is required 
const cors = require('cors')
const mysql = require('mysql2')

//let's define : express operations
const app=express();  //express is initiated 

//let's define : port
const port=3000;

//defining the cors- cross origin by receiving the data in json format
app.use(cors()); //open to cross origin
app.use(bodyParser.json())

//Establish the connection with dB
const db=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root',
        database:'queen_db'
    }
);

//Verifying whether DB is connected or not 

db.connect(err=> {
    if(err){
        console.log('Connection is not established with the db',err);
    }else{
        console.log('Connection established with db succesfully');
    }
});

//Show :: On what port number having this application
app.listen(port, ()=> {console.log('Server port established on 3000')})

//Define API 

//------------------------------------------Insert Data------------------------------------------------------
//To insert userinformation into database queen_db
//endpoints

app.post('/addUser', (req, res) => {
    // Extract user information from the request body
    const { FirstName, LastName, PreferredName, Pronouns, EmailAddressWork, PhoneNumber, FaxNumber, Department } = req.body;

    // Write SQL Query
    const sql = 'INSERT INTO userinformation (FirstName, LastName, PreferredName, Pronouns, EmailAddressWork, PhoneNumber, FaxNumber, Department) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    // Connect the database and execute the query
    db.query(sql, [FirstName, LastName, PreferredName, Pronouns, EmailAddressWork, PhoneNumber, FaxNumber, Department], (err, result) => {
        if (err) {
            console.error('Error in Adding The User Information', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json({ message: 'User Information Added Successfully' });
        }
    });

    // Close the connection
    // db.end();
});
//------------------------------------------view data (all)---------------------------
app.get('/getUsers', (req, res) => {
    // Write SQL Query
    const sql = 'SELECT * FROM userinformation';

    // Connect database and call the query method
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error in fetching the user information', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(result);
        }
    });
});


//-------------------------------------view data(by Id)------------------------------------
app.get('/getUsers/:id', (req, res) => {
    const id = req.params.id;
    // Define Query . [No data supply here]
    const sql = 'SELECT * FROM userinformation WHERE id = ?';

    // Connect database and call the query method
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error in fetching the user information by ID', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            res.status(200).json(result);
        }
    });
});
