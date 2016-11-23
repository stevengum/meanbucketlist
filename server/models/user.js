console.log('User model loaded');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        requried: true,
        unique: true
    },
    item: [{
        type: Schema.Types.ObjectId,
        ref:'Item'
    }],
    joined: [{
        type: Schema.Types.ObjectId,
        ref:'Item'
    }]
}, {timestamp:true});

mongoose.model("User", UserSchema)
