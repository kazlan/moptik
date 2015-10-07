angular
	.module('optikApp')
	.controller('listadoController',listadoController);
	
listadoController.$inject=['$scope','dataFactory','$ionicPopover'];

function listadoController($scope,dataFactory,$ionicPopover){
	$scope.clientes = dataFactory.clientesArray;
	$scope.query = {
		nombre: "",
		localidad: "",
		provincia: "",
		meses: 0
	};
	
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