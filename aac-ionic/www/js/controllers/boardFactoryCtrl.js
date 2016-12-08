var app = angular.module('boardFactory.Ctrl', ['ionic']);

app.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  };
});

app.controller('boardFactoryController',
	function($http, $scope, $location, $ionicPopover){
		$scope.start = 0;
		$scope.end = 24;
		$scope.board = {};
		// $scope.dummyBoards = aacService.dummyBoards;
		// $scope.titleLimit = aacService.titleLimit; 

		$scope.getData = function(){
		  var req = {
		    url: 'https://lexemes-prod.herokuapp.com/board/single/',
		    data: {pk: 3},
		    method: 'POST'
			}


		  $http(req).success(function(data) {
		    $scope.board = data;
		    $scope.filled_tiles = Object.keys($scope.board.symbols)
		  })
		}

		$scope.getAboutMe = function(){
		  var req2 = {
		    url: 'https://lexemes-prod.herokuapp.com/board/single/',
		    data: {pk: 4},
		    method: 'POST'
		  }

		  $http(req2).success(function(data) {
		    $scope.board = data;
		    $scope.filled_tiles = Object.keys($scope.board.symbols)
		  })
		}

		$scope.chosenBoard = function(sampleBoard){
		  $scope.selectedIndex = sampleBoard;
		  if ($scope.dummyBoards[$scope.selectedIndex].pk == '3'){
		    $scope.getData();
		  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '5'){
		    // $scope.board = aacService.aboutMeBoard;
		    $scope.aboutcircle = true;
		  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '4'){
		     $scope.getAboutMe();
		  }else{

		  }
		}

		$scope.lastSet = function(index){
		    if ($scope.start > 0){
		      $scope.start = $scope.start - 24;
		      $scope.end = $scope.end - 24;
		    }
		 }

		$scope.nextSet = function(index){
		    if ($scope.end < $scope.dummyBoards.length){
		      $scope.start = $scope.start + 24;
		      $scope.end = $scope.end + 24;
		    }else{

		    }
		}
})

app.controller('newBoardController',
	function($http, $scope, $location, $ionicModal){


		$ionicModal.fromTemplateUrl('templates/aac-partials/_word-change.html',{
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal){
		    $scope.Modal = modal;
		  });

		  $scope.openModal = function(index){
		    $scope.Modal.show()
		  }

		  $scope.closeModal = function(index){
		    $scope.Modal.hide()
		  };

})

app.controller('editBoardController',
	function($http, $scope, $location, $ionicModal, $ionicPopover){

		// $scope.columns = aacService.columns;
		// $scope.rows = aacService.rows;
		$scope.selectedTiles = [];
		// $scope.selectedIndex = aacService.selectedIndex;
		// $scope.titleLimit = aacService.titleLimit; 
		$scope.board = {};

		$scope.clickTile = function(tile) {

		    $scope.board();
		    $scope.selectedTiles.push(tile);

		    $scope.selectedIndex = tile;

		    if($scope.selectedTiles[$scope.selectedIndex] == undefined){

		    }
		}

		$ionicModal.fromTemplateUrl('templates/aac-partials/_add-multiple-words.html',{
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal){
		    $scope.Modal = modal;
		  });

		  $scope.openModal = function(index){
		    $scope.Modal.show()
		  }

		  $scope.closeModal = function(index){
		    $scope.Modal.hide()
		  };

		  		var template = '<ion-popover-view class="popover-stuff2"><ion-content><p class="closing-x" ng-click="closePopover()">X</p><p class="popover-stuff">To edit the content of tiles with a yellow dot, go to Settings <a href="#/settings"><button class="custom-button"><i class="icon ion-gear-a"></i> Open Settings</button></a></p></ion-popover-view>';

		$scope.popover = $ionicPopover.fromTemplate(template, {
		   scope: $scope
		});

		$ionicPopover.fromTemplateUrl('settings-popover.html', {
		   scope: $scope
		}).then(function(popover){
		   $scope.popover = popover;
		});

		$scope.blankInputs =[
		    { 
		      placeholder:"ENTER WORD"
		    },
		    {
		      placeholder:"ENTER WORD"
		    },
		    {
		      placeholder:"ENTER WORD"
		    },
		    {
		      placeholder:"ENTER WORD"
		    }
		 ]

		$scope.moreInputs = function(){
		    $scope.blankInputs.push(
		      {'placeholder':'ENTER WORD'}, 
		      {'placeholder':'ENTER WORD'},
		      {'placeholder':'ENTER WORD'},
		      {'placeholder':'ENTER WORD'},
		      {'placeholder':'ENTER WORD'}
		    );
		}

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

})

