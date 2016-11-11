var app = angular.module('main.Ctrl', ['ionic', 'ngCordova']);

app.filter('sliceArr', function(){
  return function(arr, start, end){
    if (!arr || !arr.length >= 25) { return; }
    return arr.slice(start, end);
  };
});

app.filter('breaking', function(){
  return function(word){
    if(word.length > 10){
      firstHalf = word.substr(0,9);
      return firstHalf;
    }
  }
});

app.filter('breaking2', function(){
  return function(word){
    if(word.length > 10){
      secondHalf = word.substr(10,word.length);
      return secondHalf;
    }
  }
});

app.controller('mainController',
function($http, $scope, $ionicSideMenuDelegate, $ionicModal,
  $location, $ionicPopover, $ionicHistory, aacService, appConfig, $timeout) {

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $scope.doLogout = function() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
      $location.path('/login');
    };

    if (localStorage.getItem("username") === null) {
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
          data: {user_username: localStorage.getItem('username')},
          method: 'POST',
          headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
          }
        }

        console.log("Getting boards", req)

        $http(req).success(function(data) {
          $scope.board = data.boards[0];
          $scope.userBoards = data.boards;
          $scope.quickbar = data.quickbar;
          $scope.filled_tiles = Object.keys($scope.board.symbols)
          window.localStorage['boards'] = angular.toJson(data);
        })
      } else {
        var data = angular.fromJson(window.localStorage['boards'])
        console.log(data)
        $scope.userBoards = data.boards
        $scope.board = data.boards[0];
        $scope.quickbar = data.quickbar;
        $scope.filled_tiles = Object.keys($scope.board.symbols)
      }
    };

    $scope.checkBoards = function(data) {
      // Do we actually need to download the boards
      // Return bool

      // For now, let's just make a file.
      // window.localStorage['boards'] = angular.toJson(data);
      // console.log("Saved boards", angular.fromJson(window.localStorage['boards']))
      if (localStorage.getItem('boards') !== null) {
        return false // Get the boards
      } else {
        return true // Do not get the boards
      }
    }

    $scope.mainBoardLoader();

    $scope.chosenBoard = function(index){
      $scope.board = $scope.userBoards[index];
      $scope.filled_tiles = Object.keys($scope.board)
    };

    $scope.homeButton = function(){
      $scope.board = $scope.userBoards[0];
      $scope.filled_tiles = Object.keys($scope.board)
    }

    // COLOR MODAL FUNCTIONS AND OBJECTS
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

    $ionicModal.fromTemplateUrl('templates/aac-partials/_color-modal.html',{
      // id: '1',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal){
      $scope.Modal = modal;
    });

    $scope.openModal = function(index){
      $timeout(function (){
        if ($scope.buttons.colors) {
          return;
        }
        $scope.Modal.show()
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
      
      if(tile.target_board){
        var req = {
          url: appConfig.backendURL + '/board/single/',
          data: {pk: tile.target_board.pk},
          method: 'POST',
          headers: {
            Authorization: 'JWT ' + localStorage.getItem('authToken')
          }
        }

        $http(req).success(function(data) {
          console.log('loadingData');
          $scope.board = data;
          $scope.filled_tiles = Object.keys($scope.board)
        })
      }else{
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

          console.log($scope.selectedTiles);
          $scope.selectedIndex = tile;

          if($scope.selectedTiles[$scope.selectedIndex] == undefined){
            console.log("no index!!");
          }
        }
      }
    }

    // $scope.class = "none";
    $scope.selectedBtn2 = true;
    // $scope.class.color = "white";

    // PHRASE BAR FUNCTIONS
    $scope.deleteLastTile = function () {
      $scope.selectedTiles.pop();
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
            url: 'https://lexemes-dev.herokuapp.com/compaction/symbols/',
            data: {pks: "[" + pks.toString() + "]"},
            method: 'POST'
          }

          $http(sreq).success(function(data) {
            console.log(data)
            // That's right! No data or auth for this
            var req = {
              url: "https://aiaas.pandorabots.com/talk/1409613061631/uglybuddy?input=" + data.sentence + "&user_key=22979a79e76310f4250128edd868e5fa",
              method: "POST"
            }
            $http(req).success(function(data){
              $scope.speakText(data.responses[0]);

              //Se oculta boton de play
              $scope.play = false;
              //Se muestra boton de play
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
        TTS.speak({
          text: text,
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

        var audio = new Audio('assets/sounds/bell.wav');
        audio.play();
      }

      $scope.class = "white";

      $scope.chosenTile = function(tileIndex){
        $scope.selectedIndex = tileIndex;
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
     $timeout(function (){
       if ($scope.buttons.chat) {
           return;
       }
       $scope.activeChat = !$scope.activeChat;
       if (!$scope.activeChat) {
         TTS.speak({
           text: "Goodbye",
         }, function () {
           // Do Something after success
           console.log("bye");
         }, function (reason) {
           // Handle the error case
         });
       }
       $scope.activeAvatar = false;
     }, 500);
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
      $timeout(function (){

        if ($scope.buttons.avatar) {
          return;
        }

        $scope.activeAvatar = !$scope.activeAvatar;
        if ($scope.activeAvatar) {
          $scope.chooseBuddieModal.show();
          $scope.activeChat = false;
        }
      }, 500);
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
