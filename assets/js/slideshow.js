angular.module('demo2', ['bootstrapLightbox'])



.controller('GalleryCtrl', function ($scope, Lightbox, musicFactory, photoFactory) {

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
                $scope.images = response.data.filter(function(item){
                    return new Date(item.eventStateDate) > yesterdayDate;
                });
                console.log($scope.images);
                openLightboxModal(0,'app/partials/shows.html');
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    function getPhotoGallery() {
        photoFactory.getPhotoGallery()
            .then(function (response) {
                $scope.images = response.data;
                console.log(response.data);
                openLightboxModal(0,'app/partials/slideshow.html')
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }




    function openLightboxModal (index,template) {
        Lightbox.openModal($scope.images, index, template);
    };

})

.factory('musicFactory', function($http) {

    var musicFactory = {};

    musicFactory.getUpcomingShows = function () {
        return $http.get('./data/shows.json')
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