console.log('/controllers/users.js loaded');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports=(function () {
    return{
        login: function(req,res){
            User.findOne({username: req.body.username}, function(err,user) {
                if(err){console.log(user)}
                else{
                    req.session.user = user;
                    req.session.save();
                    console.log('login result:', req.session.user);
                    res.json(req.session);
                }
            })
        },
        register: function (req,res) {
            console.log(req.body);
            User.findOne({username: req.body.username},function (err, user) {
                if(err){
                    console.log(err);
                    res.json(err);
                } else {
                    if(!user) {
                        var userInstance = new User(req.body);
                        userInstance.save(function(err, user) {
                            if(err) {
                                console.log(err);
                                res.json(err)
                            } else {
                                req.session.user = user;
                                req.session.save();
                                console.log('Created user!', req.session.user);
                                res.json(req.session.user);
                            }
                        }) //end promise
                    } else {
                        req.session.user = user;
                        req.session.save();
                        res.json(req.session.user);
                    }
                }
            })
        },
        logout: function (req,res) {
            if(req.session){
                console.log(`${req.session.username} requests req.session destroyed!`);
                req.session.destroy();
            }
            console.log('users.logout activated');
            res.redirect('/');
        },
        session: function(req,res){
            if(req.session.user){
                res.json(req.session.user);
            } else {
                res.json({error:"User not logged in, access denied."})
            }
        },
        getUsers: function(req,res){
            if(req.session.user){
            User.find({}, function(err,users) {
                for(var i = 0; i < users.length; i++) {
                    if(users[i]._id == req.session.user._id){
                        users.splice(i,1);
                    }
                }
                res.json(users);
            })}
        },
        getUser: function(req,res) {
            User.findOne({_id: req.params.userId})
            .populate({
                path: 'item',
                model: 'Item',
            })
            .populate({
                path: 'joined',
                model: 'Item',
                populate: {
                    path:'author',
                    model:'User'
                }
            })
            .exec(function(err, user) {
                if(err){res.json(err)}
                else if (user) {
                    res.json(user);
                } else {
                    res.json({error: "no such user"})
                }
            })
        }
    }   //end return of object
})();
