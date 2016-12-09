var app = angular.module('main.Ctrl', ['ionic', 'ngCordova', 'angularMoment']);

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

app.filter('localImage', function () {
    return function (url) {
      console.log("url", url);
      if(url){
        console.log("Got an url")
        console.log('img/local_symbols_thumbnail/' + url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("?")))
        return 'img/local_symbols_thumbnail/' + url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("?"));

      }
    };
});


app.controller('mainController',
function($http, $scope, $ionicSideMenuDelegate, $ionicModal,
    $ionicPopover, $state, aacService, appConfig, $timeout, $rootScope,
    moment, sessionService, analyticService, $ionicHistory, $location) {

    $scope.$on('$ionicView.enter', function(){
      $scope.mainBoardLoader();
      $scope.getUserInformation();
    });

    $scope.doLogout = function() {
      sessionService.destroy('authToken');
      sessionService.destroy('username');
      sessionService.destroy('boards');
    };

    $scope.columns = aacService.columns;
    $scope.rows = aacService.rows;
    $scope.selectedTiles = [];
    $scope.selectedIndex = aacService.selectedIndex;
    $scope.titleLimit = aacService.titleLimit;
    $scope.start = 0;
    $scope.end = 24;
    $scope.board = {};
    $scope.callEvent = 'normal';

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

        $http(req).success(function(data) {
          $scope.board = data.boards[0];
          $scope.selectedBoardIndex = data.boards[0].board.pk;
          $scope.userBoards = data.boards;
          $scope.quickbar = data.quickbar;
          sessionService.set('boards', angular.toJson(data));
          $scope.getHomeBoard();
          $scope.homeButton();
        }).error(function (data) {
          $scope.errData = data
        });

      } else {
        var data = angular.fromJson(sessionService.get('boards'));
        $scope.board = data.boards[0];
        $scope.selectedBoardIndex = data.boards[0].board.pk;
        $scope.userBoards = data.boards
        $scope.quickbar = data.quickbar;
        $scope.getHomeBoard();
        $scope.homeButton();
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
          // var synthetic_voice = data.userinfo && data.userinfo.synthetic_voice != null? data.userinfo.synthetic_voice : 'FEMALE';
          var voice_speed  = data.userinfo && data.userinfo.voice_speed != null? (data.userinfo.voice_speed * 0.01).toFixed(2) : 1.5;
          sessionService.set('voice_speed', voice_speed);
			}).error(function (data) {
          sessionService.set('voice_speed', 1.5);
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
      if (sessionService.get('boards') !== null) {
        return false // Get the boards
      } else {
        return true // Do not get the boards
      }
    }

    $scope.chosenBoard = function(index){
      $scope.selectedBoardIndex = $scope.userBoards[index + $scope.start].board.pk;
      $scope.board = $scope.userBoards[index + $scope.start];
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
      if ($scope.clicked || $scope.buttons.colors) {
          $scope.cancelClick = true;
          return;
      }

      $scope.clicked = true;

      $timeout(function (){
        if ($scope.cancelClick) {
          $scope.cancelClick = false;
          $scope.clicked = false;
          return;
        }

        $scope.Modal.show()

        $scope.cancelClick = false;
        $scope.clicked = false;
      }, 500);
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

      console.log(JSON.stringify(tile));

      var analyticLabel = "Tile Type: Symbol" + ", Word: " + tile.word + ", Word ID: " + tile.pk +
        ", Part of Speech: " + tile.word_class + ", Board: " + $scope.board.board.title +
        ", Timestamp: " + moment().format('M/D/YYYY, h:mm:ss a') +
        ", User: " + sessionService.get("username") + ", Mode: " + $scope.activeChat;

      analyticService.event("Touch", "Tile Touch", analyticLabel);

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
          $scope.board = data;
        }).error(function (data) {
          $scope.errData = data
        });
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
      if ($scope.selectedTiles.length <= 0) {
        $scope.play = false;
        $scope.replay = false;
      }
    }

    $scope.sayQuickPhrase = function (phrase) {
      $scope.quickPhrasePressed.push(phrase);
      // Do this before TTS so that it works when not in emulator
      $timeout(function() {
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

      $scope.sayPhrase = function () {
        if($scope.activeChat){
          $scope.callBuddy();
        }

        $scope.callEvent = 'think';
        var pks = [];
        for (i in $scope.selectedTiles) {
          pks.push($scope.selectedTiles[i].pk);
        }
        var req = {
          url: appConfig.backendURL + '/compaction/symbols/',
          data: {pks: "[" + pks.toString() + "]"},
          method: 'POST'
        }

        $http(req).success(function(data) {
          $scope.callEvent = 'talk';
          $scope.speakText(data.sentence);
          //Se oculta boton de play
          $scope.play = false;
          //Se muestra boton de play
          $scope.replay = true;


          var analyticLabel = "Input Phrase: " + $scope.selectedTiles.map(function(elem){return elem.word;}).join(', ') +
          ", Output Phrase: " + data.sentence +
          ", Phrase length: " + $scope.selectedTiles.length +
          ", Board: " + $scope.board.board.title +
          ", Timestamp: " + moment().format('M/D/YYYY, h:mm:ss a') +
          ", User: " + sessionService.get("username") + ", Mode: " + $scope.activeChat;

          analyticService.PhraseEvent("Sentence", "Play Phrase", analyticLabel);
        })
      }


    $scope.callBuddy = function () {
        $timeout(function (){
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
        }, 1000);
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

      $scope.speakText = function(text) {
        var locale = "en-GB";

        if ($scope.activeAvatar && $scope.selectedBuddy.type === "Female")
        {
            locale = "en-US";
        }

        TTS.speak({
          text: text,
          rate: sessionService.get('voice_speed'),
          // locale: $scope.getLocale(sessionService.get('synthetic_voice'))
          locale: locale
        }, function () {
          $scope.callEvent = 'normal';
        }, function (reason) {
          // Handle the error case
        });
      };

      $scope.bellSound = function(){
          if ($scope.clicked || $scope.buttons.bell) {
              $scope.cancelClick = true;
              return;
          }

          $scope.clicked = true;

         $timeout(function (){
            if ($scope.cancelClick) {
              $scope.cancelClick = false;
              $scope.clicked = false;
              return;
            }

            var audio = new Audio('assets/sounds/bell.wav');
            audio.play();

            $scope.cancelClick = false;
            $scope.clicked = false;
          }, 500);
      }

      $scope.class = "white";

      $scope.quickBarTile = function(tile){
        $scope.selectedIndex = tile;
        $scope.speakText(tile.word.root_word);

        var analyticLabel = "Tile Type: Quickbar" + ", Word: " + tile.word.root_word + ", Word ID: " + tile.pk +
        ", Part of Speech: " + tile.word.word_class.title + ", Board: " + $scope.board.board.title +
        ", Timestamp: " + moment().format('M/D/YYYY, h:mm:ss a') +
        ", User: " + sessionService.get("username") + ", Mode: " + $scope.activeChat;

        analyticService.event("Touch", "Tile Touch", analyticLabel);
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
      if ($scope.clicked || $scope.buttons.chat) {
          $scope.cancelClick = true;
          return;
      }

      $scope.clicked = true;

      $timeout(function (){
        if ($scope.cancelClick) {
          $scope.cancelClick = false;
          $scope.clicked = false;
          return;
        }

       $scope.activeChat = !$scope.activeChat;
       $scope.pickme = $scope.selectedBuddy;

       if (!$scope.activeChat) {
         $scope.speakText("Goodbye");
         $scope.activeAvatar = false;
       } else {
         $scope.activeAvatar = true;
         $scope.speakText("Hello");
       }

       $scope.cancelClick = false;
       $scope.clicked = false;
     }, 500);
   };

    $scope.handlerTap = function (button){
      $scope.buttons[button] = !$scope.buttons[button];
    };

    //Buddies
    $scope.buddies = [
      {
        name: 'Chloe',
        type: 'Female',
        gif: 'chameleon.gif',
        think: 'chameleon_think.gif',
        talk: 'chameleon_talk.gif'
      },
      {
        name: 'Emma',
        type: 'Female',
        gif: 'emma.gif',
        think: 'emma_think.gif',
        talk: 'emma_talk.gif'
      },
      {
        name: 'Harry',
        type: 'Male',
        gif: 'hedgehog.gif',
        think: 'hedgehog_think.gif',
        talk: 'hedgehog_talk.gif'
      },
      {
        name: 'José',
        type: 'Male',
        gif: 'jose.gif',
        think: 'jose_think.gif',
        talk: 'jose_talk.gif'
      }
    ];

    $rootScope.selectedBuddy = $rootScope.selectedBuddy || $scope.buddies[0];
    $scope.activeAvatar = false;

    $scope.buttonAvatar = function(){
      if ($scope.clicked || $scope.buttons.avatar) {
          $scope.cancelClick = true;
          return;
      }

      $scope.clicked = true;

      $timeout(function (){
        if ($scope.cancelClick) {
          $scope.cancelClick = false;
          $scope.clicked = false;
          return;
        }

        $scope.activeAvatar = !$scope.activeAvatar;
        if ($scope.activeAvatar) {
          $scope.chooseBuddieModal.show();
          $scope.activeChat = false;
        }

        $scope.cancelClick = false;
        $scope.clicked = false;
      }, 500);
    };

    $scope.pickme = '';
    $scope.buddySelect = function (buddy){
        var locale = "en-GB";

        $scope.pickme = buddy;

        if (buddy.type === "Female")
        {
            locale = "en-US";
        }

        TTS.speak({
          text: "Hello",
          rate: sessionService.get('voice_speed'),
          // locale: $scope.getLocale(sessionService.get('synthetic_voice'))
          locale: locale
        }, function () {
          // Do Something after success
        }, function (reason) {
          // Handle the error case
        });
    };

    $scope.buddyPickMe = function (buddy){
      $scope.activeAvatar = true;
      $rootScope.selectedBuddy = buddy;
      $scope.pickme = '';
      $scope.activeAvatar = false;
    };

    $scope.cancelBuddySelect = function (){
      $scope.pickme = '';
      $scope.activeAvatar = false;
      $scope.chooseBuddieModal.hide();
    };

     //Modal choose buddy
    //  $ionicModal.fromTemplateUrl('templates/aac-partials/_choose_buddie.html',{
    //    scope: $scope,
    //    animation: 'slide-in-up',
    //    backdropClickToClose: false
    //  }).then(function(modal){
    //    $scope.chooseBuddieModal = modal;
    //  });

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
