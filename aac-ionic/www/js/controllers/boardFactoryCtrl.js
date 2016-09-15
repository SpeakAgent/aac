var app = angular.module('boardFactory.Ctrl', ['ionic']);

app.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  };
});

app.controller('boardFactoryController',
	function($http, $scope, $location, $ionicPopover, $location, aacService){
		// $scope.selectedTiles = [];
		// $scope.selectedIndex = aacService.selectedIndex;
		$scope.start = 0;
		$scope.end = 24;
		$scope.board = {};

		$scope.colorName =[
		    {colorTitle: 'Sky Blue',
		     primaryColor:'#50E2E3',
		     secondaryColor:'#008484',
		     url:'img/color_change/colorBlob-skyBlue.svg'
		 	},

		    {colorTitle: 'Electric Green',
		     primaryColor:'#BCE72B', 
		     secondaryColor:'#18745C', 
		     url:'img/color_change/colorBlob_electricGreen.svg'
		 	},

		    {colorTitle: 'Hot Pink',
		     primaryColor:'#D5388A',
		     secondaryColor:'#F787C6', 
		     url:'img/color_change/colorBlob_hotPink.svg'
		 	},

		    {colorTitle: 'Tangerine',
		     primaryColor:'#E07600',
		     secondaryColor:'#982900', 
		     url:'img/color_change/colorBlob_tangerine.svg'
		 	},

		    {colorTitle: 'Butter Yellow',
		     primaryColor:'#FFDB3B',
		     secondaryColor:'#DEC75F',
		     url:'img/color_change/colorBlob_butterYellow.svg'
		 	},

		    {colorTitle: 'Tomato Red',
		     primaryColor:'#E6213F',
		     secondaryColor:'#E899A6',
		     url:'img/color_change/colorBlob_tomatoRed.svg'
		 	},

		    {colorTitle: 'Denim Blue',
		     primaryColor:'#325DC1',
		     secondaryColor:'#ADB1E8',
		     url:'img/color_change/colorBlob_denimBlue.svg'
		 	},

		    {colorTitle: 'Steel Gray',
		     primaryColor:'#7D989A',
		     secondaryColor:'#A9CED1',
		     url:'img/color_change/colorBlob_steelGray.svg'
		 	},

		    {colorTitle: 'Periwinkle Blue',
		     primaryColor:'#8AB6E1',
		     secondaryColor:'#3496C7', 
		     url:'img/color_change/colorBlob_periwinkleBlue.svg'
		 	},

		    {colorTitle: 'Forest Green',
		     primaryColor:'#18745C',
		     secondaryColor:'#7BB59F',
		     url:'img/color_change/colorBlob_forestGreen.svg'
		 	},

		    {colorTitle: 'Intense Purple',
		     primaryColor:'#6B28C6',
		     secondaryColor:'#C6A4EB',
		     url:'img/color_change/colorBlob_intensePurple.svg'
		 	},

		    {colorTitle: 'Seafoam Green',
		     primaryColor:'#2FCB95',
		     secondaryColor:'#A7E8C5',
		     url:'img/color_change/colorBlob_seafoamGreen.svg'
		 	},
		]

		var template = '<ion-popover-view class="popover-stuff2"><ion-content><p class="closing-x" ng-click="closePopover()">X</p><p class="popover-stuff">To edit the content of tiles with a yellow dot, go to Settings <a href="#/settings"><button class="custom-button"><i class="icon ion-gear-a"></i> Open Settings</button></a></p></ion-popover-view>';

		$scope.popover = $ionicPopover.fromTemplate(template, {
		   scope: $scope
		});

		$ionicPopover.fromTemplateUrl('settings-popover.html', {
		   scope: $scope
		}).then(function(popover){
		   $scope.popover = popover;
		});

		$scope.openPopover = function($event){
		   $scope.popover.show($event);
		};

		$scope.closePopover = function(){
		   $scope.popover.hide();
		};

		$scope.$on('$destroy', function(){
		   $scope.popover.remove();
		});

		$scope.$on('popover.hidden', function(){
		});

		$scope.$on('popover.removed', function(){
		});

		$scope.lastSet = function(index){
		    console.log("Last Set button is working");
		    if ($scope.start > 0){
		      $scope.start = $scope.start - 24;
		      $scope.end = $scope.end - 24;
		    }
		  }

		$scope.nextSet = function(index){
		    console.log("Next Set button is working");
		    if ($scope.end < $scope.dummyBoards.length){
		      $scope.start = $scope.start + 24;
		      $scope.end = $scope.end + 24;
		    }else{
		      console.log("No more left");
		    }
		}
})