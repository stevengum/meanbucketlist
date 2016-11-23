var app = angular.module("myApp", ['ngRoute', 'ngMessages']);

app.config($routeProvider => {
    $routeProvider
    .when('/', {
        templateUrl:'/partials/login.html',
        controller:'userController',
        controllerAs:'uC'
    })
    .when('/login', {
        templateUrl:'/partials/login.html',
        controller:'userController',
        controllerAs:'uC',
    })
    .when('/success', {
        templateUrl:'/partials/success.html',
        controller:'userController',
        controllerAs:'uC',
    })
    .when('/dashboard', {
        templateUrl:'/partials/dashboard.html',
        controller:'listController',
        controllerAs:'lC',
    })
    .when('/user/:id', {
        templateUrl: '/partials/user.html',
        controller: 'itemController',
        controllerAs: 'iC'
    })
    // .when('/user/:id', {
    //     templateUrl: '',
    //     controller: '',
    //     controllerAs: '',
    // })
/*
    .when('/', {
        templateUrl:'',
        controller:'',
        controllerAs:'',
    })
*/
    .otherwise('/')
})
