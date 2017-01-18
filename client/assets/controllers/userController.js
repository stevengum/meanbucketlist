app.controller("userController", ['$scope', '$routeParams', '$location', 'usersFactory', function ($scope, $routeParams, $location, uF) {
    var self = this;
    //
    $scope.tested = "tested 1";
    self.test = "test";
    // Line 4-5 are for testing multiple controllers
    $scope.login=function (user_data) {
        if(user_data){
            // console.log(user_data);
            uF.login(user_data, function(err) {
                self.errors= err
            });
        }
        else {
            self.errors="Submitted login info insufficient! Have you registered?\n"
        }
    } //end $scope.login
    $scope.register = (new_user) =>{
        if(new_user){
            // console.log(new_user);
            uF.register(new_user);
        } else {
            console.log("don't send empty forms");
        }
    }
    uF.session(function(data) {
        $scope.data = data;
    });



}])
