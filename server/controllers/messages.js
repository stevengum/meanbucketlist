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
            // console.log(`ObjectId("${req.session.user._id}")`);
            if(req.session.user) {
                Message.find().or([{author: req.session.user._id}, {recepient: req.session.user._id}])
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
                        console.log(`This is session's user's id: ${req.session.user._id}`);
                        var authored = [],
                            received = [];
                        for(var i = 0; i < messages.length; i++) {
                            if(messages[i].author._id == req.session.user._id){
                                authored.push(messages[i]);
                            } else {
                                received.push(messages[i]);
                            }
                        }
                        console.log(authored);
                        console.log(received);
                        var data = {
                            authored: authored,
                            received: received
                        }
                        res.json(data);
                    }
                });
            }
        },
    }
})();
