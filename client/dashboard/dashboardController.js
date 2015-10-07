angular
	.module('optikApp')
	.controller('dashboardController', dashboardController);

dashboardController.$inject= ['$scope'];

function dashboardController($scope){
	$scope.initMsg ="Eips";
}