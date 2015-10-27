angular
	.module('optikApp')
	.controller('listadoController',listadoController);
	
listadoController.$inject=['$scope','dataFactory','$ionicPopover', 'locationFactory'];

function listadoController($scope,dataFactory,$ionicPopover, locationFactory){
	$scope.clientes = dataFactory.clientesArray;
	$scope.geo = {};
	$scope.query = {
		nombre: "",
		localidad: "",
		provincia: "",
		meses: 0
	};

	$scope.getGeo = function(cp, provincia){
		locationFactory.locateCP(cp, provincia).then(
			function success(data){
				$scope.geo = data;
			},function error(data){
				console.log(data);
			}
		);
	}
	
	//gestión del popover
	$ionicPopover
		.fromTemplateUrl('filtros.html', {
    		scope: $scope
  		})
		.then(function(popover) {
    		$scope.popover = popover;
  		});
	$scope.openPopover = function($event) {
		$scope.popover.show($event);
	};
	$scope.closePopover = function() {
		$scope.popover.hide();
	};
	//Cleanup the popover when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.popover.remove();
	});
};