var express = require('express');
var app = express();


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin',   "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(express.bodyParser());
app.use(allowCrossDomain);


var contacts = [{
        "_id": "0",
        "first_name": "Andrew",
        "last_name": "Ladwig",
        "phone_number": "281-787-6441"
    },
    {
        "_id": "1",
        "first_name": "Meg",
        "last_name": "Ladwig",
        "phone_number": "979-324-5703"
}]
app.get('/contacts', function(req,res){
    console.log('GET /contacts');
    res.statusCode = 200;
    res.json(contacts);
});

app.get('/contacts/:id', function(req,res){
   res.json(contacts[req.params.id]); 
});


app.post('/contacts', function(req,res){
    var newContact = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "phone_number": req.body.phone_number
    };
    contacts.push(newContact);
    res.json(newContact);
});

app.put('/contacts/:id', function(req,res){
    contacts[req.params.id] = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "phone_number": req.body.phone_number
    };
    res.json(contacts[req.params.id]);
});

app.delete('/contacts/:id', function(req,res){
    contacts.splice(req.params.id, 1);
    res.send("Contact deleted.");
    
});


app.listen(process.env.PORT || 8000);
