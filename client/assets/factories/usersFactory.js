app.factory('usersFactory', ['$http', '$location', '$routeParams', function ($http,  $location, $routeParams) {
    function UserFactory() {
        var self= this;
        this.login= function (user_data) {
            console.log("userFactory user_data:",user_data);
            $http.post('/login', user_data).then(function (res) {
                if(res){
                    $location.url('/dashboard')
                }
            })
        };
        this.register = function(new_user){
            console.log("userFactory new_data:",new_user);
            $http.post('/register', new_user).then(function(res) {
                console.log(res);
                if(res){
                    $location.url('/dashboard')
                }
            })
        };
        this.session = function (callback) {
            $http.get('/user/session').then(function (res) {
                if(!res.data.error){
                    callback(res.data);
                } else {
                    console.log(res.data.error);
                    $location.url('/');
                }
            })
        };
        this.getUser = function(userId, callback){
            $http.get(`/getUser/${userId}`).then(function(res) {
                if(res.data.error){
                    console.log(res.data.error)
                } else{
                    callback(res.data);
                }
            })
        }
    }
    return new UserFactory();
}])
