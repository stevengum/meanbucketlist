var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    content : {
        type: String,
        required: [true, 'message content is required!'],
        minlength: [2, 'your message must have 3 or more characters'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recepient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamp: true});

mongoose.model("Message", MessageSchema);
