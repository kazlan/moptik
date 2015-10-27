angular
	.module('optikApp',['angular-meteor','ui.router','ionic','ngGeolocation']);
	
function onReady() {
	angular.bootstrap(document, ['optikApp']);
}

if (Meteor.isCordova)
	angular.element(document).on("deviceready", onReady);
else
	angular.element(document).ready(onReady);