var mongoose = require('mongoose');

var User = mongoose.model('User');
var Message = mongoose.model('Message');

module.exports = (function() {
    return{
        sendMessage: function(req,res) {
            console.log('sendMessage Controller Backend:', req.body.content);
            var messageInstance = new Message(req.body);
            messageInstance.author = req.session.user._id;
            messageInstance.recepient = req.params.userId;
            console.log(messageInstance);
            messageInstance.save(function(err, message) {
                if(err) {
                    res.json(err);
                } else {
                    res.json(message);
                }
            });
        },
        listMessages: function(req,res) {
            Message.find({author: req.session.user.id})
                .populate({
                    path: 'author',
                    model: 'User'
                })
                .populate({
                    path: 'recepient',
                    model: 'User'
                })
                .exec(function (err, messages) {
                if(err) {
                    res.json(err);
                } else {
                    res.json(messages);
                }
            });
        },

    }
})();
