app.factory('itemsFactory', ['$http', '$location', ($http, $location) => {
    function itemsFactory() {
        var self = this;
        this.getUserEvents = function(userId, callback) {
            $http.get(`/items/${userId}`).then(function(res) {
                callback(res.data);
            })
        }
        this.getUsers = function(callback){
            $http.get('/users').then(function(res) {
                callback(res.data);
            })
        }
        this.getItems = function(callback) {
            $http.get('/getItems').then(function(res) {
                // console.log(res.data);
                var items = res.data.joined.concat(res.data.item)
                // console.log('items:', items);
                callback(items);
            })
        }
        this.createItem = function(newItem) {
            // console.log('itemsFactory received new item: ', newItem);
            $http.post('/createItem', newItem).then(function(res) {
                if(res.data.error){
                    // console.log(res.data);
                }
            })
        }
        this.completed = function (item) {
            $http.post('/item/completed', item).then(function(res) {
                // console.log(res);
            })
        }
        this.getTrip = function(data, callback) {
            // console.log('factory data', data);
            $http.post('/item/retrieve', data).then(function(res) {
                // console.log('response from server', res);
                callback(res);
            })
        }
    };
    return new itemsFactory();
} ])
