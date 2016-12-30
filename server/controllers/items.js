console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
console.log('/controllers/items.js loaded');

var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

module.exports=(function() {
    return{
        createItem: function(req,res) {
            User.findOne({_id: req.body.author}, function(err, author) {
                if(err) {res.json(err)}
                if(req.body.joiner && req.body.author != req.body.joiner){
                    User.findOne({_id: req.body.joiner}, function(err, joiner) {
                        if(err){res.json(err)}
                        else {
                            var itemInstance = new Item(req.body);
                            itemInstance.completd = false;
                            itemInstance.save(function(err, item) {
                                if(err){res.json(err)}
                                else{
                                    author.item.push(itemInstance)
                                    author.save(function(err, author) {
                                        if(err){res.json(err)}
                                        else{
                                            joiner.joined.push(itemInstance);
                                            joiner.save(function(err, joiner) {
                                                if(err){res.json(err)}
                                                else{res.json(item)}
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    var itemInstance = new Item(req.body)
                    itemInstance.save(function(err, item) {
                        if(err){res.json(err)}
                        else{
                            author.item.push(itemInstance)
                            author.save(function(err, author) {
                                if(err){res.json(err)}
                                else{res.json(item)}
                            })
                        }
                    })
                }
            })
        },
        getItems: function(req,res) {
            if(req.session.user){
            User.findOne({_id: req.session.user._id})
            .populate({
                path:'joined',
                model:'Item',
                populate:{
                    path:'author',
                    model:'User'
                }
            })
            .populate({
                path: 'joined',
                model: 'Item',
                populate: {
                    path:'joiner',
                    model:'User'
                }
            })
            .populate({
                path:'item',
                model:'Item',
                populate:{
                    path:'author',
                    model:'User'
                }
            })
            .populate({
                path:'joiner',
                model:'User'
            })
            .exec(function(err,items) {
                if(err){res.json(err)}
                else{
                    // console.log(items);
                    res.json(items)
                }
            })}
        },
        getItem: function (req,res) {
            console.log("This is the itemId",req.body.itemId);
            Item.findOne({_id: req.body.itemId})
            .populate({
                path:'author',
                model:'User'
            })
            .populate({
                path:'joiner',
                model:'User'
            })
            .exec(function(err,item) {
                if(err){
                    console.log(err);
                    res.json(err);
                }
                else{
                    console.log(item);
                    if(!item){
                        res.json("Item not found.");
                    } else {
                        res.json(item);
                    }
                }
            })

            console.log('data from front', req.body);
            console.log('messageafterreq');
        },

        completed: function(req,res) {
            console.log(req.body);
            Item.findOne({_id: req.body._id}, function(err, item) {
                item.completed = req.body.completed;
                item.save(function(err, item) {
                    if(err){res.json(err)}
                    else{res.json(item)}
                })
            })
        }
    }
})();
