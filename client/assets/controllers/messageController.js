app.controller('messageController', ['$scope','$routeParams','$window','usersFactory','itemsFactory','messagesFactory', function ($scope,$routeParams,$window,uF,iF, mF) {
    uF.session(data => {
        if(data.error) {
            $window.alert("Please login to access this page.");
            $scope.session_error=data.error;
        } else {
            // this.user = data.uesrname;
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
    //end of uF.session
    mF.listMessages(function (res){
        $scope.authoredMsgs = res.authored;
        $scope.receivedMsgs = res.received;
    });
    // sorting sent and received messages
    $scope.sortType = 'createdAt';
    $scope.sortReverse = false;
    $scope.sortSent = 'createdAt';
    $scope.sortSentReverse = false;

    $scope.sendMessage = function (message, userId) {
        mF.sendMessage(message, userId, function(res) {
        //normally (or per itemController line 4) there is an if-else statement here
        console.log(res.data);
    });}
    //end of $scope.sendMessage
}])
