angular
	.module("optikApp")
	.factory("locationFactory", locationFactory);
	
	locationFactory.$inject = ['$http'];

	function locationFactory($http){
		var service = {
			locateCP: locateCP
		}
		return service;
		
		function locateCP(cp, ciudad){
			var apiURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
			var secret = "AIzaSyAh-HoJMXYz2bOti0PKwmKqFJfhNizG4zI"
			
			var url = apiURL + cp + "+" + ciudad + "&key=" + secret;
			return $http.get(url).then(locOK, locKO);
			
			function locOK(response){
				if (response.data.status == "OK"){
					return response.data.results[0].geometry.location;
				}else{
					return null
				}
			}
			function locKO(response){
				return null
			}
		}
	}