const express = require('express');

const sql = require('mysql');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const con = sql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: 'student',
});

con.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected');
    }
})

app.get('/', (req,res) => {
    res.send('In Home Page');
});

app.post('/add', (req,res) => {
    try{
        if(req.body.firstName === undefined || req.body.lastName === undefined || req.body.registerNumber === undefined){
            throw 'Invalid Fields';
        }
        else{
            let data = {
                firstName: req.body.firstName,
                secondName: req.body.lastName,
                registerNumber: req.body.registerNumber,
                time: Date.now(),
            }

            let query = 'INSERT INTO student_info ( firstName , lastName , registrationNumber ) VALUES ( "'+data.firstName+'" , "'+data.secondName+'" , "'+data.registerNumber+'" )';

            con.query(query, (err , result) => {
                if(err){
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else{
                    console.log('Data Added');
                    res.status(201).json({
                        message: 'Data Added'
                    })
                }
            })

        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message: e
        })
    }
});

app.patch('/update', (req,res) => {
    try{
        if(req.body.newFirstName === undefined || req.body.newFirstName === undefined){
            throw 'Invalid Exception';
        }
        else{
            let query = 'UPDATE student_info SET firstName="'+req.body.newFirstName+'" WHERE firstName="'+req.body.oldFirstName+'"';
            con.query(query , (err , result) => {
                if(err){
                    console.log(err);
                    res.status(503).json({
                        message: err
                    });
                }
                else{
                    console.log('Data Added');
                    res.status(201).json({
                        message: 'Data Updated'
                    })
                }
            })
        }
    }
    catch(e){
        res.status(400).json({
            message: e
        })
    }
});

app.get('/readAll' , (req,res) => {
    let query = 'SELECT * FROM student_info';
    con.query(query , (err,result) => {
        if(err) {
            console.log(err);
            res.status(503).json({
                message: err
            })
        }
        else{
            console.log(result);
            res.status(200).json({
                results: result
            })
        }
    })
});

app.delete('/delete', (req,res) => {
    try{
        if(req.body.firstName === undefined){
            throw 'Invalid Field';
        }
        else{
            let query = 'DELETE FROM student_info WHERE firstName="'+req.body.firstName+'"';
            con.query((err , result) => {
                if(err) {
                    console.log(err);
                    res.status(503).json({
                        message: err
                    })
                }
                else{
                    console.log('Data Deleted');
                    console.log(`Affected: ${result.affectedRows}`);
                    res.status(200).json({
                        message: 'Deleted'
                    })
                }
            })
        }
    }
    catch(e){
        res.status(400).json({
            message: e
        })
    }
})

app.listen(port , (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log(`Started on port number ${port}`);
    }
})