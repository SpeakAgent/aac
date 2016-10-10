var app = angular.module('main.Ctrl', ['ionic']);

app.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
    console.log(arr);
  };
});

app.controller('mainController', 
  function($http, $scope, $ionicSideMenuDelegate, $ionicModal,
    $location, $ionicPopover, $ionicHistory, appConfig,
    aacService) {
    
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
  // can't figure out how to pull this from the service
  // $scope.board = aacService.board;

  var req = {
    url: appConfig.backendURL + '/user/get/info/',
    data: {username: localStorage.getItem('username')},
    method: 'POST',
    headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
    }
  }

  $http(req).success(function(data) {
    $scope.userProfileInfo = data;
  })


  $scope.getData = function(){
    var req = {
      url: appConfig.backendURL + '/board/first/user/',
      data: {user_username: localStorage.getItem('username')},
      method: 'POST',
      headers: {
          Authorization: 'JWT ' + localStorage.getItem('authToken')
      }
    }

    $http(req).success(function(data) {
      $scope.board = data;
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

  $scope.getData();

  $scope.chosenBoard = function(sampleBoard){
  $scope.selectedIndex = sampleBoard;
  console.log($scope.dummyBoards[$scope.selectedIndex].pk);
  if ($scope.dummyBoards[$scope.selectedIndex].pk == '3'){
    console.log($scope.dummyBoards[$scope.selectedIndex].pk);
    // $scope.board = aacService.getBoard();
    $scope.getData();
  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '5'){
    $scope.board = aacService.aboutMeBoard;
    $scope.aboutcircle = true;
  } else if ($scope.dummyBoards[$scope.selectedIndex].pk == '4'){
    console.log($scope.board.pk);
     $scope.getAboutMe();
  }else{
    console.log("This icon doesn't have an associated board");
  }
}
  

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
    
    console.log($scope.selectedIndex);
    var container = document.getElementById('container');

    var bodyBack = document.getElementById('bodyBack');
    bodyBack.style.backgroundColor = $scope.colorName[$scope.selectedIndex].secondaryColor;

    var fullBody = document.getElementById('full-body');
    fullBody.style.backgroundColor = $scope.colorName[$scope.selectedIndex].primaryColor;

    var btnSection = document.getElementById('btn-section');
    btnSection.style.backgroundColor = $scope.colorName[$scope.selectedIndex].primaryColor;

    var buttonCircle2 = document.getElementById('button-circle2');
    buttonCircle2.style.backgroundColor = $scope.colorName[$scope.selectedIndex].secondaryColor;

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
      colorChoice[$scope.selectedIndex].removeChild(placeholder);
      for(var n = 0; i < buttonCircle.length; n++){
        colorChoice[n].style.backgroundColor = "white";
        $scope.Modal.hide();
      }
    }
  }

  $scope.clickTile = function(tile) {

    $scope.selectedTiles.push(tile);

    console.log($scope.selectedTiles);
    $scope.selectedIndex = tile;

    if($scope.selectedTiles[$scope.selectedIndex] == undefined){
      console.log("no index!!");
    }
  }

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

  $scope.sayWord = function() {
    console.log($scope.selectedIndex.pk);
    var req = {
      url: 'https://lexemes-dev.herokuapp.com/compaction/symbols/',
      data: {pks: "[" + $scope.selectedIndex.pk + "]"},
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

  $scope.class = "white";

  $scope.chosenTile = function(tileIndex){
    $scope.selectedIndex = tileIndex;
    console.log(tileIndex);
  };

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

  $scope.class = "none";
  $scope.selectedBtn2 = true;
  // $scope.class.color = "white";

  $scope.activeHide = function(){
    console.log("So, it works ...");
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
