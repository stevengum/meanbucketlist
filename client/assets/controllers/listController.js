app.controller("listController", ['$scope','$routeParams','$location','$window','usersFactory', 'itemsFactory', function ($scope, $routeParams, $location, $window, uF, iF) {
    var self = this;
    uF.session(function(res) {
        if(res.error){
            $window.alert("Please login to access this page.");
        }
        else {
            $scope.data = res;
            self.user = res;
            iF.getUsers(function(res) {
                $scope.users = res;
            })
            iF.getItems(function(items) {
                self.items = items;
            })
        }
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
        iF.completed(item);
        iF.getItems(function(items) {
            self.items = items;
        })
    }
}])
