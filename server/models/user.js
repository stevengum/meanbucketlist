console.log('User model loaded');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'name is required'],
        maxlength: [20, 'name cannot be longer than 20 chars'],
        minlength: [3, 'name must be 3 or more characters'],
        validate: [{
          validator: function(name) {
            // email regex
            return /^\w+$/.test(name);
          },
          message: '{VALUE} is not a valid name'
        }]
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
