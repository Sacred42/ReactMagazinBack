const express = require('express');
const mongoose = require('mongoose');
const productSchema = require('./models/products');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');
const app = express();

require('./config/config');
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
      secret: 'secret',
      saveUninitialized: true,
    })
  )
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());
app.use(flash());

app.get('/products' , async (req, res)=>{
    const products = await productSchema.find();
    res.send(products);
})

app.get('/products/:_id' , async(req, res)=>{
    const productId = req.params;
    const product = await productSchema.findById(productId, function (err, adventure) {});
    res.send(product);
})

app.post('/signup' , function(req, res, next){
 passport.authenticate('local.signup' , function(err, user, info){
     
     if(err){
         console.log(err);
     }
     req.logIn(user, function(err) {
      if (err) {return res.send({body : req.flash('error'),
                                 type : 'danger' }); }
      return res.send({body :req.flash('success'), type : 'success'});
    });
  })(req, res, next);
})

app.post('/signin', function(req, res, next){
    passport.authenticate('local.signin' , function(err, user, info){
        if(err){
            return console.log(err);
        }
        req.logIn(user, function(err) {
            if (err) {return res.send({body : req.flash('error'),
                                       type : 'danger' }); }
            return res.send({body :[ user.email + " Successed signup!"], type : 'success'});
          });
    })(req, res, next);
});

app.listen(5000 , ()=> console.log('Server is working'));

try{
    mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false' , { useNewUrlParser : true, useFindAndModify : false , useUnifiedTopology: true});   
}
catch(e){
  console.log(e);
}