(function() {
var app = angular.module('starter.boards', ['ionic']);
});

app.controller('BoardController', 
  function($http, $scope, $ionicModal, $location, $ionicPopover) {

  // To be on the safe side, put most of the top stuff in reused controller
  $scope.board = {};
  $scope.settings = true;
  $scope.step = 1;
  sample_symbol = {
      word: "Sample",
      icon: "img/symbols/a_lot.png",
      pk: 15,
    }
  $scope.columns = "abcdef"
  $scope.rows = "123456"
  $scope.selectedTiles = []
  $scope.selectedIndex = -2
  $scope.class = "white";
  $scope.class = "none";

var req = {
  url: 'https://lexemes-dev.herokuapp.com/board/single/',
  data: {pk: 3},
  method: 'POST'
}

$http(req).success(function(data) {
  $scope.board = data;
  $scope.filled_tiles = Object.keys($scope.board.symbols)
})

// main ctrl only
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
//

//Put in settingsCtrl
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

//

//mainCtrl
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
//

// settingsCtrl
$scope.panel = function(number){
  if(number == "1"){
    var self = document.getElementById("settings");
    self.style.backgroundColor = "#008485";
    self.style.color = "white";
    $scope.step = 1;
      // if (number == "2" || number == "3" || number == "4" || number == "5"){
      var synthetic = document.getElementById("synthetic");
      synthetic.style.backgroundColor = "white";
      synthetic.style.color = "black";

      var sound = document.getElementById("sound");
      sound.style.backgroundColor = "white";
      sound.style.color = "black";

      var phrase = document.getElementById("phrase");
      phrase.style.backgroundColor = "white";
      phrase.style.color = "black";

      var alternate = document.getElementById("alternate");
      alternate.style.backgroundColor = "white";
      alternate.style.color = "black";

      var aboutMe = document.getElementById("aboutMe");
      aboutMe.style.backgroundColor = "white";
      aboutMe.style.color = "black";
      // }

  } else if(number == "2"){
      var self = document.getElementById("synthetic");
      self.style.backgroundColor = "#008485";
      self.style.color = "white";
      $scope.step = 2;

      var settings = document.getElementById("settings");
      settings.style.backgroundColor = "white";
      settings.style.color = "black";

      var sound = document.getElementById("sound");
      sound.style.backgroundColor = "white";
      sound.style.color = "black";

      var phrase = document.getElementById("phrase");
      phrase.style.backgroundColor = "white";
      phrase.style.color = "black";

      var alternate = document.getElementById("alternate");
      alternate.style.backgroundColor = "white";
      alternate.style.color = "black";

      var aboutMe = document.getElementById("aboutMe");
      aboutMe.style.backgroundColor = "white";
      aboutMe.style.color = "black";

  } else if(number == "3"){
      var self = document.getElementById("sound");
      self.style.backgroundColor = "#008485";
      self.style.color = "white";
      $scope.step = 3;

      var synthetic = document.getElementById("synthetic");
      synthetic.style.backgroundColor = "white";
      synthetic.style.color = "black";

      var settings = document.getElementById("settings");
      settings.style.backgroundColor = "white";
      settings.style.color = "black";

      var phrase = document.getElementById("phrase");
      phrase.style.backgroundColor = "white";
      phrase.style.color = "black";

      var alternate = document.getElementById("alternate");
      alternate.style.backgroundColor = "white";
      alternate.style.color = "black";

      var aboutMe = document.getElementById("aboutMe");
      aboutMe.style.backgroundColor = "white";
      aboutMe.style.color = "black";

  } else if(number == "4"){
      var self = document.getElementById("phrase");
      self.style.backgroundColor = "#008485";
      self.style.color = "white";
      $scope.step = 4;

      var synthetic = document.getElementById("synthetic");
      synthetic.style.backgroundColor = "white";
      synthetic.style.color = "black";

      var sound = document.getElementById("sound");
      sound.style.backgroundColor = "white";
      sound.style.color = "black";

      var settings = document.getElementById("settings");
      settings.style.backgroundColor = "white";
      settings.style.color = "black";

      var alternate = document.getElementById("alternate");
      alternate.style.backgroundColor = "white";
      alternate.style.color = "black";

      var aboutMe = document.getElementById("aboutMe");
      aboutMe.style.backgroundColor = "white";
      aboutMe.style.color = "black";

  } else if(number == "5"){
      var self = document.getElementById("alternate");
      self.style.backgroundColor = "#008485";
      self.style.color = "white";
      $scope.step = 5;

      var synthetic = document.getElementById("synthetic");
      synthetic.style.backgroundColor = "white";
      synthetic.style.color = "black";

      var sound = document.getElementById("sound");
      sound.style.backgroundColor = "white";
      sound.style.color = "black";

      var phrase = document.getElementById("phrase");
      phrase.style.backgroundColor = "white";
      phrase.style.color = "black";

      var settings = document.getElementById("settings");
      settings.style.backgroundColor = "white";
      settings.style.color = "black";

      var aboutMe = document.getElementById("aboutMe");
      aboutMe.style.backgroundColor = "white";
      aboutMe.style.color = "black";

  }else if(number == "6"){
      var self = document.getElementById("aboutMe");
      self.style.backgroundColor = "#008485";
      self.style.color = "white";
      $scope.step = 6;

      var synthetic = document.getElementById("synthetic");
      synthetic.style.backgroundColor = "white";
      synthetic.style.color = "black";

      var sound = document.getElementById("sound");
      sound.style.backgroundColor = "white";
      sound.style.color = "black";

      var phrase = document.getElementById("phrase");
      phrase.style.backgroundColor = "white";
      phrase.style.color = "black";

      var settings = document.getElementById("settings");
      settings.style.backgroundColor = "white";
      settings.style.color = "black";

      var alternate = document.getElementById("alternate");
      alternate.style.backgroundColor = "white";
      alternate.style.color = "black";

  } else {
    console.log("This isn't working either?!? God!?!?");
  }
}
//
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

}());