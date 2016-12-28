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
    .when('/dashboard', {
        templateUrl:'/partials/dashboard.html',
        controller:'listController',
        controllerAs:'lC',
    })
    .when('/user/messages', {
        templateUrl: '/partials/idxMessages.html',
        controller: 'messageController',
        controllerAs: 'mC'
    })
    .when('/user/:id', {
        templateUrl: '/partials/user.html',
        controller: 'itemController',
        controllerAs: 'iC'
    })
    .when('/user/:userId/:itemId', {
        templateUrl: '/partials/item.html',
        controller: 'itemController',
        controllerAs: 'iC'
    })
    .when('/message/:id', {
        templateUrl: '/partials/messages.html',
        controller: 'messageController',
        controllerAs: 'mC'
    })
    .otherwise('/')
})
