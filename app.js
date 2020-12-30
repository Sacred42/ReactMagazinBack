const express = require('express');
const mongoose = require('mongoose');
const productSchema = require('./models/products');
const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/products' , async (req, res)=>{
    const products = await productSchema.find();
    res.send(products);
})

app.get('/products/:_id' , async(req, res)=>{
    const productId = req.params;
    const product = await productSchema.findById(productId, function (err, adventure) {});
    res.send(product);
})

app.listen(5000 , ()=> console.log('Server is working'));

try{
    mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false' , { useNewUrlParser : true, useFindAndModify : false , useUnifiedTopology: true});   
}
catch(e){
  console.log(e);
}