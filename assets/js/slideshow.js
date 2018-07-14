angular.module('demo2', ['bootstrapLightbox'])



.controller('GalleryCtrl', function ($scope, Lightbox, musicFactory, photoFactory, $filter) {

    //exposes this function so it can be called from a view
    $scope.getUpcomingShows = getUpcomingShows;
    $scope.getPhotoGallery = getPhotoGallery;
    $scope.Lightbox = Lightbox;
   // $scope.index = index;

    //getUpcomingShows();
    function getUpcomingShows() {
        musicFactory.getUpcomingShows()
            .then(function (response) {
                var yesterdayDate = new Date();
                yesterdayDate.setDate(yesterdayDate.getDate()-1);
                $scope.images = response.data.items.filter(function(item){
                    return new Date(item.start.dateTime) > yesterdayDate;
                });
                $scope.images = $filter('orderBy')($scope.images, 'start.dateTime');
                console.log($scope.images);
                openLightboxModal(0,'app/partials/shows.html');
              //  init();
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    function getPhotoGallery() {
        photoFactory.getPhotoGallery()
            .then(function (response) {
                $scope.images = response.data;
                console.log(response.data);
                openLightboxModal(0,'app/partials/slideshow.html');

            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    function init() {
        if (!$("#map").size()) {
           // window.requestAnimationFrame(init);  //wait for the DOM element to load
        }
        else {
         //   initMap($scope.images[0].location.split(',')[0], $scope.images[0].location.split(',')[1]);
        }
    }




    function openLightboxModal (index,template) {
        Lightbox.openModal($scope.images, index, template);
    }

})

.factory('musicFactory', function($http) {

    var musicFactory = {};

    musicFactory.getUpcomingShows = function () {
        //return $http.get('./data/shows.json')

        return $http.get('https://www.googleapis.com/calendar/v3/calendars/uk6veb0gp2bb35glaetcf18300%40group.calendar.google.com/events?key=AIzaSyAh7BtUc6rMb3flhrDmvusoTWLnM48_MBY')

    }
    return musicFactory;
})

    .factory('photoFactory', function($http) {

        var photoFactory = {};

        photoFactory.getPhotoGallery = function () {
            return $http.get('./data/photos.json')
        }
        return photoFactory;
    })

;