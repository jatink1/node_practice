const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const port = 5000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/', (req,res) => {

    res.status(200).sendFile(__dirname + '/views/' + 'home.html');
    
})

app.get('/newPage', (req,res) => {

    res.status(200).sendFile(__dirname + '/views/' + 'newPage.html');

})

app.post('/message' , (req,res) => {

    try{

        let message = req.body.message;
        console.log(req.body);

        if(req.body.message === undefined){

            console.log('Invalid Field')

            throw 'Invalid Fields';

        }

        res.status(200).send(`<html>
                    <head></head>
                    <body>
                        <h1>Message: ${message}</h1>
                    </body>
                </html>`);



    }
    catch(e){

        res.status(400).send({
            message: e,
        })

    }

})

app.get('*', (req,res) => {

    res.status(404).sendFile(__dirname + '/views/' + '404.html');

})

app.post('*', (req,res) => {

    res.status(404).send({
        message: 'Route not found'
    });

})

app.listen(port, (err) => {

    if(err){
        throw err;
    }

    console.log(`Server started on ${port}`);

})