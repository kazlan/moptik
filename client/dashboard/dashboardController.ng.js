angular
	.module('optikApp')
	.controller('dashboardController', dashboardController);

dashboardController.$inject= ['$scope','$geolocation'];

function dashboardController($scope, $geolocation){
	$scope.location = {};
	$scope.initMsg ="Eips";
	$geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.location = position;
			console.log($scope.location);
         });
};