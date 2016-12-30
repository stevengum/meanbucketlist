app.controller("listController", ['$scope','$routeParams','$location','$window','usersFactory', 'itemsFactory', function ($scope, $routeParams, $location, $window, uF, iF) {
    var self = this;
    uF.session(function(res) {
        // console.log('results of uf.Session:',res);
        if(res.error){
            $window.alert("Please login to access this page.")
            $scope.session_error=res.error
        }
        else {
            $scope.data = res;
            self.user = res;
            iF.getUsers(function(res) {
                $scope.users = res;
            })
            iF.getItems(function(items) {
                self.items = items;
                // console.log(items);
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
