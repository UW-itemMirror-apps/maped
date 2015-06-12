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
    $scope.workExperiences = [];


    var myAppRef = new Firebase('https://maped.firebaseio.com/');
    console.log('firebase created :\n' + myAppRef);
    myAppRef.on('value',function(snapshot){
	    	$scope.workExperiences = snapshot.val();
	    	console.log('data :\n');
	    	console.log(snapshot.val());
	    	
	    	$scope.workExperiences=[];
	    	
	    	snapshot.val().forEach(function(data){

    		$scope.workExperiences.push(data);

    		$scope.$apply();

    	});
    	console.log($scope.workExperiences);
    	

    });
  });

  angular.module('mytodoApp').filter('yearfilter',function(){
  	var clearYearRepeated = function(items){
  		var filtered = [];
  		var yearHashCheck = {};
  		items.forEach(function(item){
  			if(yearHashCheck[item.year]){
  				item.year = '';
  			}
  			else{
  				yearHashCheck[item.year] = true;
  			}
  			filtered.push(item);
  		});
  		return filtered.reverse();
  	};
	return clearYearRepeated;

  });
