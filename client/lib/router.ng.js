angular
	.module('optikApp')
	.config( function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('listado');
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: 'client/dashboard/dashboard.html',
			})
			.state('login',{
				url: '/login',
				templateUrl: 'client/templates/login.html'	
			})
			.state('listado',{
				url: '/listado',
				templateUrl: 'client/listado/listado.html',
			})
			.state('dataUpload',{
				url: '/upload',
				templateUrl: 'client/dataUploader/dataUploader.html',
			})
		
	});