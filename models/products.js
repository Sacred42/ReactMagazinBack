const mongoose = require('mongoose');
const schema = mongoose.Schema;

var product = new schema({

        image : {type : String , required : true},
        title : {type : String , required : true},
        taste : {type : String , required : true},
        price : {type : String , required : true},
});

module.exports = mongoose.model('ReactMagazine' , product);