console.log("userController.js loaded");

app.controller("userController", ['$scope', '$routeParams', '$location', 'usersFactory', function ($scope, $routeParams, $location, uF) {
    var self = this;
    $scope.login=function (user_data) {
        if(user_data){
            console.log(user_data);
            uF.login(user_data);
        }
        else {
            console.log('no data');
        }
    } //end $scope.login
    $scope.register = (new_user) =>{
        if(new_user){
            console.log(new_user);
            uF.register(new_user);
        } else {
            console.log("don't send empty forms");
        }
    }
    uF.session(function(data) {
        console.log('results of uf.Session:',data);
    });



}])
