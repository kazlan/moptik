angular
	.module('optikApp')
	.controller('dataUploaderController', dataUploaderController);
	
	dataUploaderController.$inject = ['$scope','dataFactory'];
	
function dataUploaderController($scope, dataFactory){
	$scope.lineas = 0;
	$scope.abrirFileDialog = function (){
		ionic.trigger('click', { target: document.getElementById('excel') });
	}
	$scope.fileChanged = function(archivos){
            //dataFactory.parseXLSX(archivos[0]);
			console.log("En fileChanged");
			var lines = Object.key
			$scope.lineas = Object.keys(dataFactory.lineas(archivos[0])).length;
			console.log($scope.lineas);
        }
};