/**
 * Created by keneldridge on 5/28/16.
 */
var ngAppStrictDemo = angular.module('ngAppStrictDemo', ['ngRoute','bootstrapLightbox'])

    .config(function($routeProvider, $locationProvider) {
            $routeProvider.
            when('/h', {
                templateUrl: 'app/partials/home.html',
                controller: 'MusicController'
            }).
            when('/a', {
                templateUrl: 'app/partials/about.html',
                controller: 'RouteController'
            }).
            when('/a/:id', {
                templateUrl: 'app/partials/about.html',
                controller: 'RouteController'
            }).
            otherwise({
                redirectTo: '/index.html'
            });
       //     $locationProvider.html5Mode(true);
        })

    .controller("RouteController", function($scope) {

    })



   // .controller('MainController', function($scope) {
    //    $scope.customers = [{name:'John'},{name:'Zach'},{name:'Marie'}];
    //})

    .controller('MusicController', function ($scope, musicFactory) {

        //exposes this function so it can be called from a view
        $scope.getUpcomingShows = getUpcomingShows;

       //getUpcomingShows();
        function getUpcomingShows() {
            musicFactory.getUpcomingShows()
                .then(function (response) {
                    $scope.upcomingshows = response.data;
                    console.log(response.data);
                    //alert('ok');
                }, function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                });
        }

    })

    .factory('musicFactory', function($http) {

        var musicFactory = {};

        musicFactory.getUpcomingShows = function () {
            return $http.get('./data/shows.json')
        }
        return musicFactory;
    });
angular.bootstrap(document.getElementById("cameraDiv"), ['demo2']);






