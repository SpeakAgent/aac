
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var appConfig = angular.module('appConfig', []).constant('appConfig', {
    'backendURL': 'https://lexemes-dev.herokuapp.com'
})

angular.module('main', ['ionic', 'main.Ctrl', 'settings.Ctrl', 'main.aacService',
                        'boardFactory.Ctrl', 'Login.Ctrl', 'appConfig',
                        'sessionService'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

   $stateProvider.state('main',{
      controller:'mainController',
      url: '/main',
      templateUrl: 'templates/main.html'
    });

    $stateProvider.state('login', {
      controller: 'LoginController',
      url: '/login',
      templateUrl: 'templates/login.html',
    })

    $stateProvider.state('settings',{
        controller: 'settingsController',
        url:'/settings',
        templateUrl: 'templates/settings.html'
      });

    $stateProvider.state('board_factory',{
      controller: 'boardFactoryController',
      url:'/board_factory',
      templateUrl: 'templates/board_factory.html'
    })

    $stateProvider.state('board_factory/:id',{
      controller: 'editBoardController',
      url:'/board_factory/edit/:id',
      templateUrl: 'templates/board_edit.html'
    })

    $stateProvider.state('board_factory/new',{
      controller: 'newBoardController',
      url:'/board_factory/new',
      templateUrl: 'templates/board_factory_new.html'
    })
  })

var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function($http, $ionicModal){
  
	this.title = "This is a title";
	this.board = {};
	this.board.title = "Home";
	this.columns = "abcdef";
	this.rows = "123456";
	this.selectedIndex = -2;
	this.titleLimit = 20;
  this.aacService = {};
  this.aacService.data = {};
  this.voice_volume = 150;
  this.synthetic_voice = 'FEMALE';

  // this.longWords = [
  //   {
  //     word:"puzzlement",
  //     image:"img/aac_board_imgs/crayon.png"
  //   },
  //   {
  //     word:"abdominohysterectomy",
  //     image:"img/aac_board_imgs/alpaca.png"
  //   },
  //   {
  //     word:"razzmatazz",
  //     image:"img/aac_board_imgs/art.png"
  //   },
  //   {
  //     word:"antienvironmentalist",
  //     image:"img/aac_board_imgs/balloon.png"
  //   },
  //   {
  //     word: "bumfuzzles",
  //     image:"img/aac_board_imgs/bird.png"
  //   },
  //   {
  //     word: "antiinsurrectionists",
  //     image:"img/aac_board_imgs/clock.png"
  //   },
  //   {
  //     word:"bemuzzling",
  //     image:"img/aac_board_imgs/crayon.png",
  //   },
  //   {
  //     word:"compartmentalization",
  //     image:"img/aac_board_imgs/alpaca.png",
  //   },
  //   {
  //     word:"skyjacking",
  //     image:"img/aac_board_imgs/art.png",
  //   },
  //   {
  //     word:"counterintuitiveness",
  //     image:"img/aac_board_imgs/balloon.png",
  //   },
  //   {
  //     word:"zigzagging",
  //     image:"img/aac_board_imgs/bird.png",
  //   },
  //   {
  //     word:"electrophysiologists",
  //     image:"img/aac_board_imgs/clock.png",
  //   },
  // ]

// }

    // this.board = {};
  // this.board.data = {};

  // this.aacService.getBoard = function(){
  //   var ureq = {
  //     url: "http://iamready.herokuapp.com/users/user/all/",
  //     data: {
  //       pk: localStorage.getItem('pk'),
  //       mode: "simple"
  //     },
  //     method: "POST",
  //     headers: {
  //       Authorization: 'JWT ' + localStorage.getItem('authToken')
  //     },
  //   }

  //   $http.get(ureq)
  //     .success(function(data){
  //       aacService.data.nukes = data;
  //       console.log(aacService.data.nukes);
  //     });

  //   return aacService;
  // } 
})
var app = angular.module('boardFactory.Ctrl', ['ionic']);

app.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  };
});

app.controller('boardFactoryController',
	function($http, $scope, $location, $ionicPopover, $location){
		$scope.start = 0;
		$scope.end = 24;
		$scope.board = {};
		// $scope.dummyBoards = aacService.dummyBoards;
		// $scope.titleLimit = aacService.titleLimit; 

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
		    console.log($scope.dummyBoards[$scope.selectedIndex].pk);
		    $scope.getData();
		  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '5'){
		    // $scope.board = aacService.aboutMeBoard;
		    $scope.aboutcircle = true;
		  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '4'){
		    console.log($scope.board.pk);
		     $scope.getAboutMe();
		  }else{
		    console.log("This icon doesn't have an associated board");
		  }
		}

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

		    console.log($scope.selectedTiles);
		    $scope.selectedIndex = tile;

		    if($scope.selectedTiles[$scope.selectedIndex] == undefined){
		      console.log("no index!!");
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
		    console.log("More Inputs!!!");
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


var app = angular.module('Login.Ctrl', ['ionic', 'angular-jwt']);

app.controller('LoginController', function($scope, $http, $location,
  $state, jwtHelper, appConfig, aacService, sessionService){
  
  if(sessionService.get('username')){
      $state.go('main');
  }

  $scope.loginData = {};
  $scope.authToken = sessionService.get('authToken');
  if ($scope.authToken) {
    $scope.username = jwtHelper.decodeToken($scope.authToken).username;
  }

  //Perform logout
  $scope.doLogout = function(data, status, headers, config) {
    $scope.authToken = null;
    $scope.username= null;
    sessionService.destroy('authToken');
    sessionService.destroy('username');
    sessionService.destroy('boards');

    $scope.$apply()

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $state.go('login');
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.loginData.username = $scope.loginData.username.toLowerCase();
    $scope.loginError = '';

    // Handle login
    var tokenAuthURL = appConfig.backendURL + '/api-token-auth/';
    var responsePromise = $http.post(tokenAuthURL,
      {
        'username': $scope.loginData.username,
        'password': $scope.loginData.password
      });

    responsePromise.success(function(data, status, headers, config) {
      sessionService.set('authToken', data.token);
      sessionService.set('username', $scope.loginData.username);
      sessionService.set('startSession', new Date().getTime());

      $http.defaults.headers.common.Authorization = 'Token ' + data.token;

      $state.go('main');
    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };
});

var app = angular.module('main.Ctrl', ['ionic', 'ngCordova']);

app.filter('sliceArr', function(){
  return function(arr, start, end){
    if (!arr || !arr.length >= 25) { return; }
    return arr.slice(start, end);
  };
});

app.filter('charLimit', function () {
      return function (word, limit) {
          return word && word.length > limit? word.substring(0, limit) + '...' : word;
      };
  });

app.controller('mainController',
function($http, $scope, $ionicSideMenuDelegate, $ionicModal,
    $ionicPopover, $state, aacService, appConfig, $timeout,
    sessionService) {

    window.ga.startTrackerWithId('UA-87583113-1', 30)

    $scope.doLogout = function() {
      sessionService.destroy('authToken');
      sessionService.destroy('username');
      sessionService.destroy('boards');

      $state.go('login');
    };

    if (sessionService.get("username") === null) {
      $scope.doLogout();
    };

    $scope.columns = aacService.columns;
    $scope.rows = aacService.rows;
    $scope.selectedTiles = [];
    $scope.selectedIndex = aacService.selectedIndex;
    $scope.titleLimit = aacService.titleLimit;
    $scope.start = 0;
    $scope.end = 24;
    $scope.board = {};

    $scope.mainBoardLoader = function(){
      // Make sure we have to do this call! Are there boards already saved?
      if ($scope.checkBoards()) {
        var req = {
          url: appConfig.backendURL + '/board/user/',
          data: {user_username: sessionService.get('username')},
          method: 'POST',
          headers: {
            Authorization: 'JWT ' + sessionService.get('authToken')
          }
        }

        console.log("Getting boards", req)

        $http(req).success(function(data) {
          $scope.board = data.boards[0];
          console.log(data.boards[0].board.pk);
          $scope.selectedBoardIndex = data.boards[0].board.pk;
          $scope.userBoards = data.boards;
          $scope.quickbar = data.quickbar;
          sessionService.set('boards', angular.toJson(data));
          $scope.getHomeBoard();
        }).error(function (data) {
          $scope.errData = data
        });

      } else {
        var data = angular.fromJson(sessionService.get('boards'));
        console.log(data)
        $scope.userBoards = data.boards
        $scope.selectedBoardIndex = data.boards[0].board.pk;
        $scope.board = data.boards[0];
        $scope.quickbar = data.quickbar;
        $scope.getHomeBoard();
      }
    };

   	$scope.getUserInformation = function(){
			req = {
				url: appConfig.backendURL + '/user/aac/settings/',
				method: 'POST',
				headers: {
				Authorization: 'JWT ' + sessionService.get('authToken')
				},
				data: {username: sessionService.get("username")}
			};
			$http(req).success(function (data) {
          var synthetic_voice = data.userinfo && data.userinfo.synthetic_voice != null? data.userinfo.synthetic_voice : 'FEMALE';
          var voice_speed  = data.userinfo && data.userinfo.voice_speed != null? (data.userinfo.voice_speed * 0.01).toFixed(2) : 1.5;
          sessionService.set('synthetic_voice', synthetic_voice);
          sessionService.set('voice_speed', voice_speed);
			}).error(function (data) {
          $scope.errData = data
      });
		};

    $scope.getHomeBoard = function(){
      for(var y=0; y < $scope.userBoards.length; y++) {
        if($scope.userBoards[y].board.home_board == true) {
          $scope.homeBoard = $scope.userBoards[y];
          return;
        }
      }

      $scope.homeBoard = $scope.userBoards[0];
    }

    $scope.checkBoards = function(data) {
      // Do we actually need to download the boards
      // Return bool

      // For now, let's just make a file.
      // window.localStorage['boards'] = angular.toJson(data);
      // console.log("Saved boards", angular.fromJson(window.localStorage['boards']))
      if (sessionService.get('boards') !== null) {
        return false // Get the boards
      } else {
        return true // Do not get the boards
      }
    }

    $scope.mainBoardLoader();
    $scope.getUserInformation();

    $scope.chosenBoard = function(index){
      $scope.selectedBoardIndex = $scope.userBoards[index].board.pk;
      $scope.board = $scope.userBoards[index];
      $scope.speakText($scope.userBoards[index].board.title);
    };

    $scope.homeButton = function(){
      $scope.selectedBoardIndex = $scope.homeBoard.board.pk;
      $scope.board = $scope.homeBoard;
    }

    // COLOR MODAL FUNCTIONS AND OBJECTS
    $scope.colorName = [
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
    ];

    $ionicModal.fromTemplateUrl('templates/aac-partials/_color-modal.html',{
      // id: '1',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal){
      $scope.Modal = modal;
    });

    $scope.openModal = function(index){
      if ($scope.buttons.colors) {
        return;
      }

      $timeout(function (){
        if ($scope.buttons.colors) {
          return;
        }
        $scope.Modal.show()
      }, 300);
    }

  $scope.closeModal = function(index){
    $scope.Modal.hide();
    var container = document.getElementById('container');

    var bodyBack = document.getElementById('bodyBack');
    bodyBack.style.backgroundColor = $scope.colorName[0].secondaryColor;

    var fullBody = document.getElementById('full-body');
    fullBody.style.backgroundColor = $scope.colorName[0].primaryColor;

    var btnSection = document.getElementById('btn-section');
    btnSection.style.backgroundColor = $scope.colorName[0].primaryColor;

    var buttonCircle = document.getElementsByClassName('button-circle');
    console.log(buttonCircle[1].style.backgroundColor);

      var colorChoice = document.getElementsByClassName('color-choice');

      var scribble = document.getElementById('scribble');
      var originalImg = document.getElementsByClassName('originalImg');

      var placeholder = document.createElement("img");
      placeholder.src = "img/color_change/colorBlob_white.svg";
      placeholder.style.width = "70%";
      placeholder.style.height = "70%";
      placeholder.id = "placeholder";

    for(var i = 0; i < buttonCircle.length; i++){
      buttonCircle[i].style.backgroundColor = $scope.colorName[0].secondaryColor;
      colorChoice[0].style.backgroundColor = $scope.colorName[0].primaryColor;
      if(originalImg[0].style.display = "none"){
        colorChoice[0].appendChild(placeholder);
      }
    }
  };

    $scope.doneCancel = function(){
      this.style.border = "blue";
    }

    $scope.colorSelect = function(colorIndex){
      $scope.selectedIndex = colorIndex;

      var container = document.getElementById('container');

      var bodyBack = document.getElementById('bodyBack');
      bodyBack.style.backgroundColor = $scope.colorName[$scope.selectedIndex].secondaryColor;

      var fullBody = document.getElementById('full-body');
      fullBody.style.backgroundColor = $scope.colorName[$scope.selectedIndex].primaryColor;

      var btnSection = document.getElementById('btn-section');
      btnSection.style.backgroundColor = $scope.colorName[$scope.selectedIndex].primaryColor;

      // var buttonCircle2 = document.getElementById('button-circle2');
      // buttonCircle2.style.backgroundColor = $scope.colorName[$scope.selectedIndex].secondaryColor;

      var buttonCircle = document.getElementsByClassName('button-circle');

      var colorChoice = document.getElementsByClassName('color-choice');

      var scribble = document.getElementById('scribble');
      var originalImg = document.getElementsByClassName('originalImg');

      var placeholder = document.createElement("img");
      placeholder.src = "img/color_change/colorBlob_white.svg";
      placeholder.style.width = "70%";
      placeholder.style.height = "70%";
      placeholder.id = "placeholder";


      for(var i = 0; i < buttonCircle.length; i++){
        buttonCircle[i].style.backgroundColor = $scope.colorName[$scope.selectedIndex].secondaryColor;
        colorChoice[$scope.selectedIndex].style.backgroundColor = $scope.colorName[$scope.selectedIndex].primaryColor;
        if(originalImg[$scope.selectedIndex].style.display = "none"){
          colorChoice[$scope.selectedIndex].appendChild(placeholder);
        }
      }
      originalImg[$scope.selectedIndex].style.display = "none";
    }

    $scope.changeBackground = function(){
      var buttonCircle = document.getElementsByClassName('button-circle');
      var originalImg = document.getElementsByClassName('originalImg');
      for(var i = 0; i < buttonCircle.length; i++){
        var colorChoice = document.getElementsByClassName('color-choice');
        var placeholder = document.getElementById("placeholder");
        originalImg[$scope.selectedIndex].style.display = "inline";
        // colorChoice[$scope.selectedIndex].removeChild(placeholder);
        for(var n = 0; i < buttonCircle.length; n++){
          colorChoice[n].style.backgroundColor = "white";
          $scope.Modal.hide();
        }
      }
    }

    // BOARD TILE FUNCTIONS
    //Play and replay
    $scope.play = false;
    $scope.replay = false;
    $scope.clickTile = function(tile) {
      if(!tile){
        return;
      }

      if(tile.target_board){
        var req = {
          url: appConfig.backendURL + '/board/single/',
          data: {pk: tile.target_board.pk},
          method: 'POST',
          headers: {
            Authorization: 'JWT ' + sessionService.get('authToken')
          }
        }

        $http(req).success(function(data) {
          console.log('loadingData');
          $scope.board = data;
        }).error(function (data) {
          $scope.errData = data
        });

        return;
      }

      for(var x=0; x < $scope.selectedTiles.length; x++){
        if($scope.selectedTiles[x].pk == tile.pk){
          $scope.selectedIndex = tile;
          return;
        }
      }

      if ($scope.selectedTiles.length < 8) {
        //Se verifica si el usuario ha dado play o replay
        if ($scope.replay) {
          //Se limpia el array de items y el index
          $scope.selectedTiles = [];
          $scope.selectedIndex = undefined;
        }

        $scope.selectedTiles.push(tile);
        $scope.selectedIndex = tile;

        //Se muestra el boton de play
        $scope.play = true;
        //Se oculta el boton de replay
        $scope.replay = false;

        $scope.selectedIndex = tile;

        $scope.sayWord();
      }
    }

    // $scope.class = "none";
    $scope.selectedBtn2 = true;
    // $scope.class.color = "white";

    // PHRASE BAR FUNCTIONS
    $scope.deleteLastTile = function () {
      $scope.selectedTiles.pop();
      console.log($scope.selectedTiles.length);
      if ($scope.selectedTiles.length <= 0) {
        $scope.play = false;
        $scope.replay = false;
      }
    }

    $scope.sayQuickPhrase = function (phrase) {
      $scope.quickPhrasePressed.push(phrase);
      // Do this before TTS so that it works when not in emulator
      $timeout(function() {
        console.log("in timeout")
        $scope.quickPhrasePressed.splice(
          $scope.quickPhrasePressed.indexOf(phrase), 1)
        }, 750)
        $scope.speakText(phrase);
      }

      $scope.isQuickPhrasePressed = function (phrase) {
        if ($scope.quickPhrasePressed.indexOf(phrase) > -1) {
          return true
        } else {
          return false
        }
      }

      $scope.callBuddy = function () {
          console.log("Buddy called.")
          var app_id = "1409613061631";
          var user_key = "22979a79e76310f4250128edd868e5fa";
          var botname = "uglybuddy";
          var text = "Hello";

          // Get a sentence
          var pks = [];
          for (i in $scope.selectedTiles) {
            pks.push($scope.selectedTiles[i].pk);
          }
          var sreq = {
            url: appConfig.backendURL + '/compaction/symbols/',
            data: {pks: "[" + pks.toString() + "]"},
            method: 'POST'
          }

          $http(sreq).success(function(data) {
            console.log(data)
            var req = {
              url: "https://aiaas.pandorabots.com/talk/1409613061631/uglybuddy?input=" + data.sentence + "&user_key=22979a79e76310f4250128edd868e5fa",
              method: "POST"
            }
            $http(req).success(function(data){
              $scope.speakText(data.responses[0]);

              $scope.play = false;
              $scope.replay = true;
            })
          })
        }

        $scope.$on('callBuddyEvent', function(){
          $scope.callEvent = true;
          $timeout(function (){
            $scope.callEvent = false;
          }, 1000);
        });

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
          //Se oculta boton de play
          $scope.play = false;
          //Se muestra boton de play
          $scope.replay = true;
        })
      }

      $scope.sayWord = function() {
        if($scope.selectedIndex.label){
          $scope.speakText($scope.selectedIndex.label);
          return;
        }

        var req = {
          url: appConfig.backendURL + '/compaction/symbols/',
          data: {pks: "[" + $scope.selectedIndex.pk + "]"},
          method: 'POST'
        }
        $http(req).success(function(data) {
          $scope.speakText(data.sentence);
        })
      }

      $scope.getLocale = function(voice){
        if(voice == 'MALE'){
          return 'en-GB';
        }else{
          return 'en-US';
        }
      }

      $scope.speakText = function(text) {
        TTS.speak({
          text: text,
          rate: sessionService.get('voice_speed'),
          locale: $scope.getLocale(sessionService.get('synthetic_voice'))
        }, function () {
          // Do Something after success
        }, function (reason) {
          // Handle the error case
        });
      };

      $scope.bellSound = function(){
          if ($scope.buttons.bell) {
            return;
          }

         $timeout(function (){
            if ($scope.buttons.bell) {
              return;
            }

            var audio = new Audio('assets/sounds/bell.wav');
            audio.play();
          }, 300);
      }

      $scope.class = "white";

      $scope.chosenTile = function(tile){
        $scope.selectedIndex = tile;
        $scope.speakText(tile.lexeme);
      };

      $scope.lastSet = function(index){
        if ($scope.start > 0){
          $scope.start = $scope.start - 24;
          $scope.end = $scope.end - 24;
        }
      }

      $scope.nextSet = function(index){
        if ($scope.end < $scope.userBoards.length){
          $scope.start = $scope.start + 24;
          $scope.end = $scope.end + 24;
        }else{

        }
      }

      // $scope.class = "none";
      $scope.selectedBtn2 = true;
      // $scope.class.color = "white";

      $scope.activeHide = function(){
        $scope.class = "none";
        if($scope.class === "none"){
          $scope.class = "selected-btn2";
          $scope.hide = true;
          $scope.selectedBtn2 = false;
        }
      }

  $scope.onTap = function() {
      console.log("yes?");
      $scope.imageUrl = 'img/AAC_assets/delete_button_tapped.png';
      $timeout(function () {
        $scope.imageUrl = 'img/AAC_assets/delete_button.png';
      }, 250);
  };

  $scope.imageUrl = 'img/AAC_assets/delete_button.png';

  $scope.buttons = {
    bell: false,
    colors : false,
    avatar: false,
    chat: false
  };

   $scope.activeChat = false;
   $scope.buttonChat = function(){
     if ($scope.buttons.chat) {
       return;
     }
     $timeout(function (){
       if ($scope.buttons.chat) {
           return;
       }
       $scope.activeChat = !$scope.activeChat;
       if (!$scope.activeChat) {
         $scope.speakText("Goodbye");
       }
       $scope.activeAvatar = false;
     }, 300);
   };

    $scope.handlerTap = function (button){
      $scope.buttons[button] = !$scope.buttons[button];
    };

    //Buddies
    $scope.buddies = [
      {
        name: 'Chloe',
        gif: 'chameleon.gif',
        think: 'chameleon_think.gif',
        talk: 'chameleon_talk.gif'
      },
      {
        name: 'Emma',
        gif: 'emma.gif',
        think: 'emma_think.gif',
        talk: 'emma_talk.gif'
      },
      {
        name: 'Harry',
        gif: 'hedgehog.gif',
        think: 'hedgehog_think.gif',
        talk: 'hedgehog_talk.gif'
      },
      {
        name: 'José',
        gif: 'jose.gif',
        think: 'jose_think.gif',
        talk: 'jose_talk.gif'
      }
    ];

    $scope.selectedBuddy = $scope.buddies[0];
    $scope.activeAvatar = false;

    $scope.buttonAvatar = function(){
      if ($scope.buttons.avatar) {
        return;
      }

      $timeout(function (){
        if ($scope.buttons.avatar) {
          return;
        }

        $scope.activeAvatar = !$scope.activeAvatar;
        if ($scope.activeAvatar) {
          $scope.chooseBuddieModal.show();
          $scope.activeChat = false;
        }
      }, 300);
    };

    $scope.pickme = '';
    $scope.buddySelect = function (buddy){
      $scope.pickme = buddy;
    };

    $scope.buddyPickMe = function (buddy){
      $scope.selectedBuddy = buddy;
      $scope.pickme = '';
      $scope.activeAvatar = false;
      $scope.chooseBuddieModal.hide();
    };

    $scope.cancelBuddySelect = function (){
      $scope.pickme = '';
      $scope.activeAvatar = false;
      $scope.chooseBuddieModal.hide();
    };

     //Modal choose buddy
     $ionicModal.fromTemplateUrl('templates/aac-partials/_choose_buddie.html',{
       scope: $scope,
       animation: 'slide-in-up',
       backdropClickToClose: false
     }).then(function(modal){
       $scope.chooseBuddieModal = modal;
     });

     $scope.hideDone = function(){
        if($scope.class === "selected-btn2"){
          $scope.class = "none";
          $scope.hide = false;
          $scope.selectedBtn2 = true;
        }
      }

      $scope.imageUrl = 'img/AAC_assets/delete_button.png';

  /**
  * Hide Tiles
  */
  $scope.hideItem = function (col, row){
    $scope.board.symbols[col+row].hidden = !$scope.board.symbols[col+row].hidden;
  };

  $scope.hideRegular = function (lexemePK){
    for(l in $scope.quickbar){
      if ($scope.quickbar[l].pk === lexemePK) {
        $scope.quickbar[l].hidden = !$scope.quickbar[l].hidden;
        break;
      }
    }
  };

  $scope.hideUserBoard = function (userBoardPK){
    for(u in $scope.userBoards){
      if ($scope.userBoards[u].board.pk === userBoardPK) {
        $scope.userBoards[u].board.hidden = !$scope.userBoards[u].board.hidden;
        break;
      }
    }
  };

  // Toggle flag
  $scope.toggleTiles = false;
  /**
  * function that detects change on flag
  * to show all hidden tiles
  */
  $scope.enableItems = function (){
    //Go over all tiles
    for(var tile in $scope.board.symbols){
      //If tile is hidden
      if ($scope.board.symbols[tile].hidden) {
        //change to visible
        $scope.board.symbols[tile].hidden = false;
      }
    }

    //Go over tiles
    for(var lexeme in $scope.quickbar){
      //If tile is hidden
      if ($scope.quickbar[lexeme].hidden) {
        //change to visible
        $scope.quickbar[lexeme].hidden = false;
      }
    }

    for(var userBoard in $scope.userBoards){
      //If hidden
      if ($scope.userBoards[userBoard].board.hidden) {
        //change to visible
        $scope.userBoards[userBoard].board.hidden = false;
      }
    }
  }

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

angular.module('sessionService', ['ionic'])

.factory('sessionService',['$http',function($http){
return {
   set:function(key,value){
      return localStorage.setItem(key,JSON.stringify(value));
   },
   get:function(key){
    console.log("Bad key?", key)
    console.log("Val for key", localStorage.getItem(key))
     try {
        return JSON.parse(localStorage.getItem(key));
    } catch(err) {
        return localStorage.getItem(key);
    }
   },
   destroy:function(key){
     return localStorage.removeItem(key);
   },
 };
}]);
var app = angular.module('settings.Ctrl', ['ionic']);

app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});

app.controller('settingsController',
	function($http, $scope, $cordovaFileTransfer,
	$timeout, $window, $state, appConfig, aacService, sessionService){
		$scope.settings = true;
		$scope.step = 1;
		$scope.file = undefined;

		$scope.downloadBoard = function() {
			console.log("Downloading a board");
			var req = {
	          url: appConfig.backendURL + '/board/user/',
	          data: {user_username: sessionService.get('username')},
	          method: 'POST',
	          headers: {
	            Authorization: 'JWT ' + sessionService.get('authToken')
	          }
	        }

	        console.log("Getting boards", req)

	        $http(req).success(function(data) {
	          $scope.board = data.boards[0];
	          $scope.userBoards = data.boards;
	          $scope.quickbar = data.quickbar;
	          $scope.filled_tiles = Object.keys($scope.board.symbols)
	          console.log("Got boards", data)
	          sessionService.set('boards', angular.toJson(data));
	        })
	        .error(function(error) {
	        	console.log("Could not download", error)
	        })
		}
		
		$scope.alertAnimation = function(message){
			$scope.message = message;
   		    $timeout(function(){$scope.message = null}, 2700);
		}

		$scope.doLogout = function() {
			sessionService.destroy('authToken');
			sessionService.destroy('username');
	        $state.go('login');
		};

		if (sessionService.get("username") === null) {
			$scope.doLogout();
		};

		$scope.getUserInformation = function(){
			req = {
				url: appConfig.backendURL + '/user/aac/settings/',
				method: 'POST',
				headers: {
				Authorization: 'JWT ' + sessionService.get('authToken')
				},
				data: {username: sessionService.get("username")}
			};
			$http(req).success(function (data) {
				$scope.user = data;
				var synthetic_voice = data.userinfo && data.userinfo.synthetic_voice != null? data.userinfo.synthetic_voice : 'FEMALE';
				var voice_speed  = data.userinfo && data.userinfo.voice_speed != null? (data.userinfo.voice_speed * 0.01).toFixed(2) : 1.5;
				sessionService.set('synthetic_voice', synthetic_voice);
				sessionService.set('voice_speed', voice_speed);
			})
		};

		$scope.synthVoiceSubmit = function(){
			user_req = {
				url: appConfig.backendURL + '/user/info/',
				method: 'POST',
				headers: {
					Authorization: 'JWT ' + sessionService.get('authToken'),
				},
				data: {username: sessionService.get("username"),
					   synthetic_voice: this.user.userinfo.synthetic_voice,
					   voice_speed: this.user.userinfo.voice_speed}
			}
			return $http(user_req)
			.success(function(data) {
				$scope.getUserInformation();
				var message = {
					text: 'Synthetic Voice options was saved successfully.',
					type: 'success',
					animation: 'slideDown'
				};

				$scope.alertAnimation(message);
			})
			.error(function (data) {
				$window.scrollTo(0, 0);
				var message = {
					text: 'An error ocurred updating user information!',
					type: 'danger',
					animation: 'slideDown'
				};
				$scope.alertAnimation(message);
			});
		}

		$scope.getUserInformation();

		$scope.uploadFile = function(e){
			var image = e.target.files[0];
			var read = new FileReader();

			$scope.profileImgName = e.target.files[0].name

			imageUrl = e.target.files[0]

			read.onloadend = function(evt) {
				result_base64 = evt.target.result;
				$scope.profileImgBase64 = btoa(read.result);
			};
			read.readAsBinaryString(image);
		};

		$scope.SubmitAboutMe = function(){
			user_req = {
				url: appConfig.backendURL + '/user/info/',
				method: 'POST',
				headers: {
					Authorization: 'JWT ' + sessionService.get('authToken'),
				},
				data: {username: sessionService.get("username"),
					   profile_image: $scope.profileImgBase64,
					   profile_image_name: $scope.profileImgName}
			}
			return $http(user_req)
			.success(function(data) {
				var message = {
					text: data.message,
					type: 'success',
					animation: 'slideDown'
				};
				$window.scrollTo(0, 0);

				$scope.alertAnimation(message);
				$scope.getUserInformation();
			})
			.error(function (data) {
				$window.scrollTo(0, 0);
				var message = {
					text: 'An error ocurred updating user information!',
					type: 'danger',
					animation: 'slideDown'
				};
				$scope.alertAnimation(message);
			});
		}

		$scope.step = 6;

		$scope.panel = function(number){
			$scope.step = number;
		}
	}
);
