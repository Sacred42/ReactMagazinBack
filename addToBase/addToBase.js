const mongoose = require('mongoose');
const product = require('../models/products');

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false' , { useNewUrlParser : true, useFindAndModify : false , useUnifiedTopology: true});


var products = [
    new product({
        image : 'https://ru.images-iherb.com/opn/opn02789/l/11.jpg',
        title : 'Protein Whey Gold 100%',
        taste : 'banan',
        price : '33'
    }),
    new product({
        image : 'https://ru.images-iherb.com/msc/msc70315/l/29.jpg',
        title : 'Muscletech Mass-Tech',
        taste : 'banan',
        price : '25'
    }),
    new product({
        image : 'https://ru.images-iherb.com/opn/opn02301/l/4.jpg',
        title : 'Optimum Nutrition Serious Mass',
        taste : 'banan',
        price : '23'
    }),
    new product({
        image : 'https://ru.images-iherb.com/unn/unn01612/l/20.jpg',
        title : 'Universal Nutrition, Ultra Whey Pro',
        taste : 'banan',
        price : '25'
    }),
    new product({
        image : 'https://ru.images-iherb.com/unn/unn01558/l/1.jpg',
        title : 'Universal Nutrition Ultra Whey Pro',
        taste : 'banan',
        price : '25'
    }),
    new product({
        image : 'https://ru.images-iherb.com/msf/msf71702/l/17.jpg',
        title : 'MusclePharm, Combat 100%',
        taste : 'banan',
        price : '25'
    }),
    new product({
        image : 'https://ru.images-iherb.com/amx/amx22516/l/23.jpg',
        title : 'ALLMAX Nutrition, AllWhey Classic',
        taste : 'banan',
        price : '25'
    }),
    new product({
        image : 'https://ru.images-iherb.com/amx/amx22516/l/23.jpg',
        title : 'ALLMAX Nutrition, AllWhey Classic',
        taste : 'banan',
        price : '25'
    })
];

var done = 0;
for(var i=0 ; i < products.length; i++){
    products[i].save(function(err, result){
        if (err){
            return err
        }
        done++;
        if (done === products.length) {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect();
}