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
    $ionicPopover, $state, aacService, appConfig, $timeout, $location,
    sessionService, $location, $ionicHistory, $cordovaFileTransfer) {

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

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

    function replaceImage (boardIndex, symbolIndex, targetPath, filename) {
      console.log("Would be replacing",
        $scope.userBoards[boardIndex].board.title, symbolIndex,
        targetPath, filename)
      if (symbolIndex === null && boardIndex !== null) {
        // We're just replacing the board image
        $cordovaFile.readAsDataURL(
          cordova.file.applicationDirectory, "www/img/" + filename)
          .then(function(res) {
            // console.log("Implanting apple on", boardIndex, $scope.userBoards[boardIndex].board.title)
            $scope.userBoards[boardIndex].board.image = res;
            $scope.userBoards[boardIndex].board.thumb = res;

          })
      } else if (boardIndex !== null && symbolIndex !== null ) {
          // If we have a board and a symbol, replace the symbol
          console.log("Replacing a symbol", boardIndex, symbolIndex, targetPath,
            filename)
          $cordovaFile.readAsDataURL(
          cordova.file.applicationDirectory, "www/img/" + filename)
          .then(function(res) {
            console.log("Implanting apple on symbol", 
              boardIndex, symbolIndex, 
              $scope.userBoards[boardIndex].symbols[symbolIndex])
            $scope.userBoards[boardIndex].symbols[symbolIndex].symbol.image = res;
            $scope.userBoards[boardIndex].symbols[symbolIndex].symbol.thumb = res;

          })
        } else if (boardIndex === null && symbolIndex !== null) {
          // We have no board, but a symbol? Quickbar
          console.log("Replacing a quickbar", boardIndex, symbolIndex, targetPath,
            filename)
          $cordovaFile.readAsDataURL(
          cordova.file.applicationDirectory, "www/img/" + filename)
          .then(function(res) {
            console.log("Implanting apple on symbol", 
              boardIndex, symbolIndex, 
              $scope.userBoards[boardIndex].symbols[symbolIndex])
            $scope.quickbar[symbolIndex].symbol.image = res;
            $scope.userBoards[boardIndex].symbols[symbolIndex].symbol.thumb = res;
        })

      }

        window.localStorage['boards'] = angular.toJson(
          {'boards': $scope.userBoards,
           'quickbar': $scope.quickbar});
    }

    $scope.Download = function (url, boardIndex, symbolIndex) {
      if (url === null) {
        return null
      }
      ionic.Platform.ready(function(){
        var filename = url.split("/").pop()
        console.log("filename 1", filename)
        filename = filename.split("?")[0]
        console.log("filename 2", filename)
        console.log(url.split("/"))
        url = url.split("?")[0]

       var targetPath = cordova.file.applicationDirectory + "www/img/" + filename;
        $cordovaFileTransfer.download(
          url, 
          targetPath, 
          {}, 
          true)
        .then(function (result) {
              console.log('Save file on '+targetPath+' success!');
              replaceImage(boardIndex, symbolIndex, targetPath, filename);
        }, function (error) {
              console.log('Error Download file', JSON.stringify(error));
        }, function (progress) {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        });
      });
    }

    function saveBoardImages () {
      console.log("# boards", $scope.userBoards.length)
      for (var i in $scope.userBoards) {
        // Download board image
        var board = $scope.userBoards[i].board
        var symbols = $scope.userBoards[i].symbols
        // console.log(JSON.stringify(board))
        console.log("Downloading", board.title, 
          board.image)
        $scope.Download(board.image, i, null)
        // Now, download the board tile images
        console.log("Symbols", JSON.stringify(symbols))
        for (var si in symbols) {
          console.log("Symbol index", si)
          $scope.Download(symbols[si].symbol.image, i, si)
        }
      }

      for (var qi in $scope.quickbar) {
        $scope.Download($scope.quickbar.lexeme.image, null, qi)
      }
    }

    function listDir(path){
      window.resolveLocalFileSystemURL(path,
        function (fileSystem) {
          var reader = fileSystem.createReader();
          reader.readEntries(
            function (entries) {
              console.log(JSON.stringify(entries));
            },
            function (err) {
              console.log(json.stringify(err));
            }
          );
        }, function (err) {
          console.log(err);
        }
      );
    }

    function getFile(path) {
      console.log("Getting file", path)
      window.resolveLocalFileSystemURL(
        path, 
        function(data) {
          return data}, 
        function(err) {console.log("Nope")});
    }

    $scope.mainBoardLoader = function(){
      // Make sure we have to do this call! Are there boards already saved?
      if (window.localStorage.getItem('boards') === null) {
      // if (true) {
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
          console.log("board", $scope.board) 
          $scope.userBoards = data.boards;
          $scope.quickbar = data.quickbar;
          $scope.filled_tiles = Object.keys($scope.board.symbols)
          $scope.downloadBoards(data)
          console.log("Board ready, saving images")
        })
        .error(function(error) {
          console.log("Error")
          console.log(error)
        })
        .then(function () {
          saveBoardImages();
        })
      } else {
        var data = angular.fromJson(window.localStorage['boards'])
        console.log(JSON.stringify(data))
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

    $scope.downloadBoards = function(data) {
      window.localStorage['boards'] = angular.toJson(data);

      // Go through each board
      // For each board, save the board symbol, thumb
        // Update path in JSON
        // For each board.board.word, save word symbol, thumb
          // Update path in JSON

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
      }, 200);
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
          }, 200);
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
     }, 200);
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
      }, 200);
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
