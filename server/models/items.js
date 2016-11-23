console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('Item model loaded');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    completed: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    joiner: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {timestamps: true})

mongoose.model('Item', itemSchema);
