/**
 * Created by keneldridge on 5/28/16.
 */
angular.module("ngAppStrictDemo", ['ngRoute'])

.config(function($routeProvider) {
        $routeProvider.
        when('/h', {
            templateUrl: 'app/partials/home.html',
            controller: 'RouteController'
        }).
        when('/a', {
            templateUrl: 'app/partials/about.html',
            controller: 'RouteController'
        }).
        otherwise({
            redirectTo: '/h'
        });
    })

.controller("RouteController", function($scope) {

});