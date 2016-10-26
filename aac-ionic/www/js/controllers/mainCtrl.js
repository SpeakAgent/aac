var app = angular.module('main.Ctrl', ['ionic']);

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
    $location, $ionicPopover, $ionicHistory, aacService, appConfig) {
    
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
  $scope.dummyBoards = aacService.dummyBoards;
  $scope.quickPhrasePressed = [];
  $scope.quickPhrases = ['Yes', 'No', 'Hold on', 'Help']

  // $scope.dummyBoards[$scope.selectedIndex].pk = "3";
  // $scope.longWords = aacService.longWords;

  // can't figure out how to pull this from the service
  // $scope.board = aacService.board;

  // $scope.mainBoardLoader(0, 26);

  $scope.selectedBoardTile = function(thisBoard){
    $scope.index = thisBoard;
    $scope.allTileBacks = document.getElementsByClassName("board-tile");
    console.log($scope.allTileBacks[$scope.index]);
    for(i=0; i<$scope.allTileBacks.length; i++){
      if($scope.allTileBacks[i] != $scope.allTileBacks[$scope.index]){
        $scope.allTileBacks[i].src = "img/new_dev_assets/board_tile_notched_default_1.svg";
      } else{
        $scope.allTileBacks[i].src = "img/new_dev_assets/board_tile_notched_default_yellow.svg";
      }
    }
  }

  $scope.mainBoardLoader = function(){
    var req = {
      url: 'https://lexemes-dev.herokuapp.com' + '/board/user/',
      data: {user_username: localStorage.getItem('username')},
      method: 'POST',
      headers: {
          Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(req).success(function(data) {
      $scope.board = data.boards[0];
      $scope.userBoards = data.boards;
      $scope.quickbar = data.quickbar;
      $scope.filled_tiles = Object.keys($scope.board.symbols)
    })
  }

  $scope.getAboutMe = function(){
    var req2 = {
      url: appConfig.backendURL + '/board/first/user/',
      data: {user_username: localStorage.getItem('username')},
      method: 'POST',
      headers: {
          Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(req2).success(function(data) {
      $scope.board = data;
      $scope.filled_tiles = Object.keys($scope.board.symbols)
    })
  }

  // $scope.getData();

  $scope.chosenBoard = function(index){
    $scope.board = $scope.userBoards[index]; 
    $scope.filled_tiles = Object.keys($scope.board.symbols)
  };
  
  $scope.homeButton = function(){
    $scope.board = $scope.userBoards[0];
    $scope.filled_tiles = Object.keys($scope.board.symbols)
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
    $scope.Modal.show()
  }

  $scope.closeModal = function(index){
    $scope.Modal.hide()
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
        $scope.filled_tiles = Object.keys($scope.board.symbols)
      })
    }else{
      $scope.selectedTiles.push(tile);

    $scope.selectedIndex = tile;

    if($scope.selectedTiles[$scope.selectedIndex] == undefined){

    }
  }

  // $scope.class = "none";
  $scope.selectedBtn2 = true;
  // $scope.class.color = "white";

}



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

  $scope.sayPhrase = function () {
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
      $scope.speakText(data.sentence);
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

  $scope.hideDone = function(){
    if($scope.class === "selected-btn2"){
      $scope.class = "none";
      $scope.hide = false;
      $scope.selectedBtn2 = true;
    }
  }

  $scope.imageUrl = 'img/AAC_assets/delete_button.png';

  $scope.onTap = function() {
      console.log("yes?");
      $scope.imageUrl = 'img/AAC_assets/delete_button_tapped.png';
      $timeout(function () {
        $scope.imageUrl = 'img/AAC_assets/delete_button.png';
      }, 250);
  };

  // $("div.regulars").on("mousedown", function() {
  //     $(this).toggleClass('yellow');
  // })
  // .on("mouseup", function(e) {
  //     $(this).toggleClass('yellow');
  // });
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
