// (function() {

	var app = angular.module('starter.mainCtrl', ['ionic']);

	// app.filter('slice', function(){
	//     return function(arr, start, end){
	//       return arr.slice(start, end);
	//     };
	// });

	app.controller('mainCtrl',
	  function($http, $scope, $ionicModal, $location) {

	  	$scope.colorName =[
	    {colorTitle: 'Sky Blue',
	     primaryColor:'#50E2E3',
	     secondaryColor:'#008484',
	     url:'img/color_change/colorBlob-skyBlue.svg'},

	    {colorTitle: 'Electric Green',
	     primaryColor:'#BCE72B', 
	     secondaryColor:'#18745C', 
	     url:'img/color_change/colorBlob_electricGreen.svg'},

	    {colorTitle: 'Hot Pink',
	     primaryColor:'#D5388A',
	     secondaryColor:'#F787C6', 
	     url:'img/color_change/colorBlob_hotPink.svg'},

	    {colorTitle: 'Tangerine',
	     primaryColor:'#E07600',
	     secondaryColor:'#982900', 
	     url:'img/color_change/colorBlob_tangerine.svg'},

	    {colorTitle: 'Butter Yellow',
	     primaryColor:'#FFDB3B',
	     secondaryColor:'#DEC75F',
	     url:'img/color_change/colorBlob_butterYellow.svg'},

	    {colorTitle: 'Tomato Red',
	     primaryColor:'#E6213F',
	     secondaryColor:'#E899A6',
	     url:'img/color_change/colorBlob_tomatoRed.svg'},

	    {colorTitle: 'Denim Blue',
	     primaryColor:'#325DC1',
	     secondaryColor:'#ADB1E8',
	     url:'img/color_change/colorBlob_denimBlue.svg'},

	    {colorTitle: 'Steel Gray',
	     primaryColor:'#7D989A',
	     secondaryColor:'#A9CED1',
	     url:'img/color_change/colorBlob_steelGray.svg'},

	    {colorTitle: 'Periwinkle Blue',
	     primaryColor:'#8AB6E1',
	     secondaryColor:'#3496C7', 
	     url:'img/color_change/colorBlob_periwinkleBlue.svg'},

	    {colorTitle: 'Forest Green',
	     primaryColor:'#18745C',
	     secondaryColor:'#7BB59F',
	     url:'img/color_change/colorBlob_forestGreen.svg'},

	    {colorTitle: 'Intense Purple',
	     primaryColor:'#6B28C6',
	     secondaryColor:'#C6A4EB',
	     url:'img/color_change/colorBlob_intensePurple.svg'},

	    {colorTitle: 'Seafoam Green',
	     primaryColor:'#2FCB95',
	     secondaryColor:'#A7E8C5',
	     url:'img/color_change/colorBlob_seafoamGreen.svg'},
	  ]

	  $scope.deleteLastTile = function () {
	    $scope.selectedTiles.pop();
	  }

	  $scope.sayPhrase = function () {
	    console.log($scope.selectedTiles);
	    var pks = [];
	    for (i in $scope.selectedTiles) {
	      pks.push($scope.selectedTiles[i].pk);
	    }
	    var req = {
	      url: 'https://lexemes-dev.herokuapp.com/compaction/symbols/',
	      data: {pks: "[" + pks.toString() + "]"},
	      method: 'POST'
	    }
	    console.log(req);
	    $http(req).success(function(data) {
	      console.log(data);
	      $scope.speakText(data.sentence);
	    })
	  }

	  $scope.speakText = function(text) {
	    TTS.speak({
	           text: text,
	       }, function () {
	           // Do Something after success
	       }, function (reason) {
	           // Handle the error case
	       });
	  	};
	})
// });