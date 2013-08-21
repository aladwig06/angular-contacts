var express = require('express');
var app = express();
var mongoose = require('mongoose');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(express.bodyParser());

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var contactSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    phone_number: String
});

var Contact = mongoose.model('Contact', contactSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
    console.log('Connected to Mongodb');
    var port;
    if(process.env.PORT){
        port = process.env.PORT;
    } else {
       port = 8000; 
    }
     console.log('Listening on port ' + port);
    
   
    
    app.get('/contacts', function(req, res){
        Contact.find(function (err, contacts){
            if(err){
                res.statusCode = 404;
                return res.json('Contacts not found ' + err);
            }
            res.json(contacts);
        });
    });
    
    app.get('/contacts/:id', function(req, res){
     
            Contact.findById(req.params.id)
            .exec(function(err, docs){
               if(err){
                res.statusCode = 404;
                return res.json('Query error: ' + err);
               }
               
               res.json(docs);
            });
    });
    
    app.post('/contacts', function(req, res){
       if(!req.body.hasOwnProperty('first_name') ||
          !req.body.hasOwnProperty('last_name') ||
          !req.body.hasOwnProperty('phone_number')){
            res.statusCode = 400;
            return res.json('Error 400: Post syntac incorrect');
          }
          
          var newContact = new Contact({
            'first_name': req.body.first_name,
            'last_name': req.body.last_name,
            'phone_number': req.body.phone_number
          });
          
          newContact.save(function(err, newContact){
            if(err){
                res.statusCode = 400;
                return res.json('Error 400: ' + err);
            }
            
            res.json(newContact);
          });
          
    });
    
    app.put('/contacts/:id', function(req, res){
       if(!req.body.hasOwnProperty('first_name') ||
          !req.body.hasOwnProperty('last_name') ||
          !req.body.hasOwnProperty('phone_number')){
            res.statusCode = 400;
            return res.json('Error 400: Post syntac incorrect');
          }
          Contact.update({ '_id': req.params.id},
                         {'first_name': req.body.first_name,
                          'last_name': req.body.last_name,
                          'phone_number': req.body.phone_number})
          .exec(function(err, numRowsUpdated, raw){
                if(err){
                    res.stausCode = 400; // <-Not sure if that is the right status code
                    return res.json('Error 400: ' + err);
                }
                res.json('Successfully updated contact.');
          });
          
          
          // update document in mongodb
    });
       
    app.delete('/contacts/:id', function(req,res){
        Contact.remove({'_id': req.params.id })
        .exec(function(err){
            if(err){
                res.statusCode = 400;
                return res.json('Error 400: ' + err);
            }
            res.json('Contact sucessfully removed');
        });
        
    });

    
    app.listen(process.env.PORT || 8000);
   
});
