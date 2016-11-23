app.controller('itemController', ['$scope', '$routeParams', '$location', 'usersFactory', 'itemsFactory', function ($scope,$routeParams,$location,uF,iF) {
    var self = this;
    uF.session(function (data) {
        this.user = data.username;
        $scope.user = data.username;
        $scope.data = data;
        console.log(data);
        if($routeParams.id){
            console.log($routeParams.id);
            uF.getUser($routeParams.id, function(res) {
                $scope.otherUser = res.username
                $scope.items = res.item
                $scope.joined = res.joined
                console.log(res);
            })
        }
        // iF.getUserItems($routeParams.userId, userItems);
    });


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
