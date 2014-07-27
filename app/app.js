/**
* DZAP Module
*
* Description
*   dayz addon pack module
*/
angular.module('DZAP', ['ngRoute'])
.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "app/home/home.html"
    })
    .when("/about", {
        templateUrl: "app/about/about.html"
    })
    .when("/install", {
        templateUrl: "app/install/install.html"
    })
    .when("/config", {
        templateUrl: "app/config/config.html"
    })
    .when("/contact", {
        templateUrl: "app/contact/contact.html"
    })
    .otherwise({
        redirectTo: '/home'
    });
}])
.controller('DZAPController', ['$scope', function($scope){
    $scope.addon = {
        name: "DayZ Epoch Addon Pack",
        version: [
            {name: "1.0.0", desc:"first release"},
            {name: "1.0.0", desc:"first release"}
        ]
    };
}])
;