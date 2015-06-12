'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mytodoApp
 */
angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

	

    var myAppRef = new Firebase("https://mapednik.firebaseio.com/");
    console.log("Firebase created :/n" +myAppRef);
    myAppRef.on("value", function(snapshot){
    	$scope.workExperiences = snapshot.val();
    	console.log("Data :/n");
    	console.log(snapshot.val());
    	$scope.workExperiences = [];
    	
    	snapshot.val().forEach(function(data){
    		$scope.workExperiences.push(data);
    		$scope.$apply();
    	});
    	console.log($scope.workExperiences)
    });
    
  });
angular.module('mytodoApp').filter('yearFilter', function(){
	var clearYearRepeated = function(items){
		var filtered = [];
		items.forEach(function(item){
			if(yearHashCheck[item.year]){
				item.year = "";
			}
			else{
				yearHashCheck[item.year] = true;
			}
			filtered.push(item);
		});
	}
	return filtered;

});