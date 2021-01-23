const mongoose = require('mongoose');
const user = mongoose.Schema;

var newUser = new user({
    email : {type: String, required : true },
    password : {type : String, required : true}
})

newUser.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

module.exports = mongoose.model('UsersReact' , newUser ) ;