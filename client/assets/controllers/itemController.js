app.controller('itemController', ['$scope', '$routeParams', '$location', 'usersFactory', 'itemsFactory', function ($scope,$routeParams,$location,uF,iF) {
    var self = this;
    uF.session( data => {
        if(data.error){
            $scope.session_error=data.error
        } else {
            this.user = data.username;
            $scope.user = data.username;
            $scope.data = data;
            if($routeParams.id){
                console.log("Received this routeParmas.id: ", $routeParams.id);
                uF.getUser($routeParams.id, function(res) {
                    $scope.otherUser = res.username;
                    $scope.items = res.item;
                    $scope.joined = res.joined;
                    $scope.userId = res._id;
                    console.log(res);
                });
            }
        }
    });
//===============================================================
    if($routeParams.userId && $routeParams.itemId) {
        var data = {
            userId: $routeParams.userId,
            itemId: $routeParams.itemId,
        };

        // console.log(data);
        iF.getTrip(data, function(res) {
            $scope.otherUser = res.data.author.username;
            console.log(res.data.author);
            $scope.item = res.data;
            console.log('response from server via factory!', res.data);
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


    // function userItems(user) {
    //     self.otherUser = user;
    //     self.done = user.items.concat(user.joined).filter(function(item) {
    //         return item.completed;
    //     })
    //     self.pending = user.items.concat(user.joined).filter(function(item) {
    //         return !item.completed;
    //     })
    // }
}])


// User.findOne({_id: req.session.userId})
//     .populate({
//         path: ''
//     })
