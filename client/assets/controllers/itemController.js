app.controller('itemController', ['$scope', '$routeParams', '$location','$window', 'usersFactory', 'itemsFactory', function ($scope,$routeParams,$location,$window,uF,iF) {
    var self = this;
    uF.session( data => {
        if(data.error){
            $window.alert("Please login to access this page.");
            $scope.session_error=data.error;
        } else {
            $scope.user = data.username;
            $scope.data = data;
            if($routeParams.id){
                console.log("Received this routeParams.id: ", $routeParams.id);
                if ($routeParams.id == $scope.data._id){
                    $location.url('/dashboard');
                } else {
                    uF.getUser($routeParams.id, function(res) {
                        $scope.otherUser = res.username;
                        $scope.items = res.item;
                        $scope.joined = res.joined;
                        $scope.userId = res._id;
                        console.log(res);
                    });
                }
            }
        }
    });
//===============================================================
    if($routeParams.userId && $routeParams.itemId) {
        var data = {
            userId: $routeParams.userId,
            itemId: $routeParams.itemId,
        };
        iF.getTrip(data, function(res) {
            $scope.otherUser = res.data.author.username;
            $scope.item = res.data;
        })
    }


    $scope.clicked = function () {
        console.log('clicked!');
        for(var i = 0; i< $scope.item.joiner.length; i++){
            if($scope.item.joiner._id == $scope.user._id){
                console.log("incorrigible");
            }
        }
    }
    $scope.truthy = function() {
        //ng-disabled="truthy()"
        return true;
    }
}])
