console.log("listController.js loaded");

app.controller("listController", ['$scope','$routeParams','$location','usersFactory', 'itemsFactory', function ($scope, $routeParams, $location, uF, iF) {
    var self = this;
    uF.session(function(res) {
        console.log('results of uf.Session:',res);
        $scope.data = res;
        self.user = res;
        iF.getUsers(function(res) {
            $scope.users = res;
        })
        iF.getItems(function(items) {
            self.items = items;
            console.log('session', items);
        })
    })  //end uF.session
    $scope.createItem = function(newItem) {
        newItem.author = self.user._id;
        console.log(newItem);
        iF.createItem(newItem);
        $scope.newItem = {};
        iF.getItems(function(items) {
            self.items = items;
        })
    }
    $scope.completeItem = function(item) {
        iF.completed(item, iF.getItems(function(items) {
            console.log(items.joined);
            self.items = items;
        }))
    }
}])
