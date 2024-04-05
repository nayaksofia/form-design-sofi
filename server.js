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

app.post('/addUser',(req,res)=>{

    //Pass the data in the form of json
    const{Id,FirstName,LastName,PreferredName,Pronouns,EmailAddressWork,PhoneNumber,FaxNumber,Department} = req.body;

    //Write SQL Query
    const sql = 'insert into userinformation values(null,?,?,?,?,?,?,?,?)';

    //Connect the database and access the query method
    db.query(sql,[Id,FirstName,LastName,PreferredName,Pronouns,EmailAddressWork,PhoneNumber,FaxNumber,Department],(err,result)=>{
        if(err){
            console.error('Error in Adding The User Infromation', err);
            res.status(500).json({error:'An error occured'});
        }else{
            res.status(200).json({message:'User Infromation Added Successfully'});
        }
    });

    // Close the connection
    //  db.end();
});

//------------------------------------------View All List Of Data That Inserted------------------------------------------

 //To view list of users ---- To get all the users lists

 app.get('/getUsers',(req,res)=>{
    
    //Because it is a get operation, there is no data supply here.
    //Write SQL Query
    const sql = 'select * from userinformation';

    //Connect database and call the query method
    db.query(sql,(err,result)=>{
     if(err){
        console.error('Error in fetching the user informations',err);
        res.status(500).jshon({error:'An error occured'});
     }else{
        res.status(200).json(result);//No message here 
     }

    });

 });

 //------------------------------------------View The List Of Data By ID------------------------------------------

//To get User By Id
app.get('/getUsers/:id',(req,res)=>{
    const id = req.params.id;
    //Define Query . [No data supply here]
    const sql = 'select * from userinformation where id= ?';
      
     //Connect database and call the query method
     db.query(sql,[id],(err,result)=>{
        if(err){
           console.error('Error in fetching the user informations by Id',err);
           res.status(500).jshon({error:'An error occured'});
        }else{
           res.status(200).json(result);//No message here 
        }
   
       });
     

});