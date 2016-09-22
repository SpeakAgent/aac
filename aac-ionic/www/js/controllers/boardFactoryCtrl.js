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

		$scope.getData = function(){
		  var req = {
		    url: 'https://lexemes-dev.herokuapp.com/board/single/',
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
		    url: 'https://lexemes-dev.herokuapp.com/board/single/',
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
		    console.log($scope.board.pk);
		    console.log($scope.dummyBoards[$scope.selectedIndex].pk);
		    // $scope.board = aacService.getBoard();
		    $scope.getData();
		  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '5'){

		    $scope.board = {
		      "title" :"About Me",
		      "symbols" : {
		        "a1" : {
		          "lexeme" : "Nickname",
		          "symbol" : {
		            "pk" : "0000",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/I.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/I.png",
		          },
		          "word": "nickname",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "b1" : {
		          "lexeme" : "Birthday",
		          "symbol" : {
		            "pk" : "0001",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/bunny.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/bunny.png",
		          },
		          "word": "birthday",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "c1" : {
		          "lexeme" : "Hometown",
		          "symbol" : {
		            "pk" : "0002",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/painting.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/painting.png",
		          },
		          "word": "hometown",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "d1" : {
		          "lexeme" : "Name of best friend",
		          "symbol" : {
		            "pk" : "0003",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/I.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/I.png",
		          },
		          "word": "best friend",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "e1" : {
		          "lexeme" : "Siblings",
		          "symbol" : {
		            "pk" : "0004",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/fun.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/fun.png",
		          },
		          "word": "siblings",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "f1" : {
		          "lexeme" : "Pets",
		          "symbol" : {
		            "pk" : "0005",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/bunny.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/bunny.png",
		          },
		          "word": "pets",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "a2" : {
		          "lexeme" : "Gender",
		          "symbol" : {
		            "pk" : "0006",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/I.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/I.png",
		          },
		          "word": "gender",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "b2" : {
		          "lexeme" : "Age",
		          "symbol" : {
		            "pk" : "0007",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/painting.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/painting.png",
		          },
		          "word": "age",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "c2" : {
		          "lexeme" : "Favorite Toy",
		          "symbol" : {
		            "pk" : "0008",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/sports.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/sports.png",
		          },
		          "word": "toy",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "d2" : {
		          "lexeme" : "Hobby",
		          "symbol" : {
		            "pk" : "0009",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/book_reading.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/book_reading.png",
		          },
		          "word": "hobby",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "e2" : {
		          "lexeme" : "Favorite sports team",
		          "symbol" : {
		            "pk" : "0010",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/sports.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/sports.png",
		          },
		          "word": "sports",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "f2" : {
		          "lexeme" : "Favorite food",
		          "symbol" : {
		            "pk" : "0011",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/food.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/food.png",
		          },
		          "word": "food",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "a3" : {
		          "lexeme" : "Favorite ice cream",
		          "symbol" : {
		            "pk" : "0012",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/food.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/food.png",
		          },
		          "word": "ice cream",
		          "pk" : "",
		          "hidden": "false",
		        },
		        "b3" : {
		          "lexeme" : "Favorite color",
		          "symbol" : {
		            "pk" : "0013",
		            "title" : "",
		            "alt_text" : "",
		            "image" : "img/aac_board_imgs/fakejsonimg/painting.png",
		            "thumb" : "img/aac_board_imgs/fakejsonimg/painting.png",
		          },
		          "word": "color",
		          "pk" : "",
		          "hidden": "false",
		        }
		      }
		    }
		    $scope.aboutcircle = true;
		  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '4'){
		    console.log($scope.board.pk);
		     $scope.getAboutMe();
		  }else{
		    console.log("This icon doesn't have an associated board");
		  }
		}


		$scope.dummyBoards =[

			{ name:"About Me",
			  img_path:"img/aac_board_imgs/crayon.png",
			  pk: '5'},

		  { name:"Lunch",
		    img_path:"img/aac_board_imgs/alpaca.png",
		    pk: '3'},

		  { name:"Feelings",
		    img_path:"img/aac_board_imgs/art.png",
		    pk: '4'},

		  { name:"Body",
		    img_path:"img/aac_board_imgs/balloon.png"},

		  { name:"Clothes",
		   	img_path:"img/aac_board_imgs/bird.png"},

			{ name:"Cars",
			  img_path:"img/aac_board_imgs/clock.png"},

		  { name:"Feelings",
		 		img_path:"img/aac_board_imgs/crayon.png"},

			{ name:"Food",
		    img_path:"img/aac_board_imgs/alpaca.png"},

		  { name:"Kind Things",
		    img_path:"img/aac_board_imgs/art.png"},

		  { name:"Morning",
		    img_path:"img/aac_board_imgs/balloon.png"},

		  { name:"Number",
		    img_path:"img/aac_board_imgs/bird.png"},

			{ name:"People",
		    img_path:"img/aac_board_imgs/clock.png"},

		  { name:"Places",
		    img_path:"img/aac_board_imgs/crayon.png"},

		  { name:"Reading",
		    img_path:"img/aac_board_imgs/alpaca.png"},

		  { name:"Sports",
		    img_path:"img/aac_board_imgs/art.png"},

			{ name:"Things",
		    img_path:"img/aac_board_imgs/balloon.png"},

		  { name:"Time",
		    img_path:"img/aac_board_imgs/bird.png"},

		  { name:"Verbs",
		    img_path:"img/aac_board_imgs/clock.png"},

		  { name:"Weather",
		    img_path:"img/aac_board_imgs/crayon.png"},

			{ name:"Nouns",
		    img_path:"img/aac_board_imgs/alpaca.png"},

		  { name:"Outdoor",
		    img_path:"img/aac_board_imgs/art.png"},

		  { name:"Animals",
		    img_path:"img/aac_board_imgs/balloon.png"},

		  { name:"Plants",
		    img_path:"img/aac_board_imgs/bird.png"},

		  { name:"Stuff",
		    img_path:"img/aac_board_imgs/clock.png"},

		  { name:"Things",
		    img_path:"img/aac_board_imgs/crayon.png"},

		  // added for sliding option
		  { name:"Nouns",
		    img_path:"img/aac_board_imgs/alpaca.png"},

		  { name:"Outdoor",
		    img_path:"img/aac_board_imgs/art.png"},

		  { name:"Animals",
		    img_path:"img/aac_board_imgs/balloon.png"},

		  { name:"Plants",
		    	img_path:"img/aac_board_imgs/bird.png"},

		  { name:"Stuff",
		    img_path:"img/aac_board_imgs/clock.png" },

		  { name:"Things",
		    img_path:"img/aac_board_imgs/crayon.png"},

		    // also added for testing purposes
		  { name:"Nouns",
		    img_path:"img/aac_board_imgs/alpaca.png" },

		  { name:"Outdoor",
		    img_path:"img/aac_board_imgs/art.png" },

		  { name:"Animals",
		    img_path:"img/aac_board_imgs/balloon.png" },

		  { name:"Plants",
		    img_path:"img/aac_board_imgs/bird.png" },

		  { name:"Stuff",
		    img_path:"img/aac_board_imgs/clock.png" },

		  { name:"Things",
		    img_path:"img/aac_board_imgs/crayon.png"},

		  { name:"Nouns",
		    img_path:"img/aac_board_imgs/alpaca.png" },

		  { name:"Outdoor",
		    img_path:"img/aac_board_imgs/art.png" },

		  { name:"Animals",
		    img_path:"img/aac_board_imgs/balloon.png" },

		  { name:"Plants",
		    img_path:"img/aac_board_imgs/bird.png" },

		  { name:"Stuff",
		    img_path:"img/aac_board_imgs/clock.png" },

		  { name:"Things",
		    img_path:"img/aac_board_imgs/crayon.png"},

		  { name:"Nouns",
		    img_path:"img/aac_board_imgs/alpaca.png" },

		  { name:"Outdoor",
		    img_path:"img/aac_board_imgs/art.png" },

		  { name:"Animals",
		    img_path:"img/aac_board_imgs/balloon.png" },

		  { name:"Plants",
		    img_path:"img/aac_board_imgs/bird.png" },

		  { name:"Stuff",
		    img_path:"img/aac_board_imgs/clock.png" },

		  { name:"Things",
		    img_path:"img/aac_board_imgs/crayon.png"},
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

