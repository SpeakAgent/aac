// angular.module('speakagentAAC.controllers', ['ionic'])

// .controller('LocationCtrl', function($scope) {
//     // Get board to display

//     // temp vars until we get remote setup.
//     $scope.board.title = "Board 1";
//     $scope.sample_symbol = {
//         word: "Sample",
//         icon: "img/symbols/a_lot.png",
//         pk: 15,
//     }
//     $scope.board.symbols = [
//         $scope.sample_symbol,
//         $scope.sample_symbol,
//         $scope.sample_symbol
//     ]
    

// })

(function() {

var app = angular.module('starter.boards', ['ionic']);

app.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  };
});

app.controller('BoardController', 
  function($http, $scope, $ionicSideMenuDelegate, $ionicModal, $element) {

  $scope.title = "This is a title";
  $scope.board = {};
  $scope.board.title = "Home";
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

  var req = {
    url: 'https://lexemes-dev.herokuapp.com/board/single/',
    data: {pk: 3},
    method: 'POST'
  }

  $http(req).success(function(data) {
    $scope.board = data;
    $scope.filled_tiles = Object.keys($scope.board.symbols)
  })

  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };

  // $scope.contact ={
  //   name: 'Mittens Cat',
  //   info: 'Tap anywhere on the card to open the modal'
  // }

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
  
  $scope.start = 0;
  $scope.end = 24;

  $ionicModal.fromTemplateUrl('templates/aac-partials/_color-modal.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal
  })

  $scope.openModal = function(){
    $scope.modal.show()
  }

  $scope.closeModal = function(){
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function(){
    $scope.modal.remove();
  });

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

    var colorChoice = document.getElementsByClassName('color-choice')

    var scribble = document.getElementById('scribble');
    var originalImg = document.getElementsByClassName('originalImg');

    var placeholder = document.createElement("img");
    placeholder.src = "img/color_change/colorBlob_white.svg";
    // placeholder.style.marginTop = "-50px";
    placeholder.style.width = "70%";
    placeholder.style.height = "70%"; 
    placeholder.id = "placeholder";
    // placeholder.style.paddingTop = "-20px";


      for(var i = 0; i < buttonCircle.length; i++){
        buttonCircle[i].style.backgroundColor = $scope.colorName[$scope.selectedIndex].secondaryColor;
        colorChoice[$scope.selectedIndex].style.backgroundColor = $scope.colorName[$scope.selectedIndex].primaryColor;
        // colorChoice[$scope.selectedIndex].appendChild(placeholder);
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
        $scope.modal.hide();
      }
    }
  }

  $scope.clickTile = function(tile) {
    $scope.selectedTiles.push(tile);

     if($scope.class === "white"){
      $scope.class = "light-blue";
    } else{
      $scope.class = "white";
    };
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

  $scope.chosenTile = function(){
    // $scope.selectedIndex = colorIndex;
    // console.log($scope.selectedIndex);
    // $scope.class = tile;
    console.log("Chosen selected");
    if($scope.class === "white"){
      $scope.class = "light-blue";
    } else{
      $scope.class = "white";
    };
  };

  $scope.dummyBoards =[
  { name:"Anmls",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Arts",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Body",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Clths",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Cars",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Feligs",
    img_path:"img/aac_board_imgs/crayon.png" },


  { name:"Food",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"KThg",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Morng",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Numr",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Peple",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Plces",
    img_path:"img/aac_board_imgs/crayon.png" },


  { name:"Redng",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Sprts",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Thngs",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Time",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Verbs",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Wethr",
    img_path:"img/aac_board_imgs/crayon.png" },


  { name:"Nouns",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Outdr",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Animl",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Plnts",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Stuf",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Thngs",
    img_path:"img/aac_board_imgs/crayon.png"},

  // added for sliding option
  { name:"Nouns",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Outdr",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Animl",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Plnts",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Stuf",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Thngs",
    img_path:"img/aac_board_imgs/crayon.png"},

    // also added for testing purposes
  { name:"Nouns",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Outdr",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Animl",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Plnts",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Stuf",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Thngs",
    img_path:"img/aac_board_imgs/crayon.png"},

  { name:"Nouns",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Outdr",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Animl",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Plnts",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Stuf",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Thngs",
    img_path:"img/aac_board_imgs/crayon.png"},

  { name:"Nouns",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Outdr",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Animl",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Plnts",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Stuf",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Thngs",
    img_path:"img/aac_board_imgs/crayon.png"},
  ]

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

  } else {
    console.log("This isn't working either?!? God!?!?");
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