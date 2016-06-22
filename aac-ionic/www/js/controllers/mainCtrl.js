
var app = angular.module('main.Ctrl', ['ionic']);

app.filter('slice', function(){
  return function(arr, start, end){
    return arr.slice(start, end);
  };
});

app.controller('mainController', 
  function($http, $scope, $ionicSideMenuDelegate, $ionicModal, $location, $ionicPopover, aacService) {

  // $scope.title = "This is a title";
  // $scope.board = {};
  // $scope.board.title = "Home";

  $scope.settings = true; //for settingsCtrl
  $scope.step = 1;

  // sample_symbol = {
  //     word: "Sample",
  //     icon: "img/symbols/a_lot.png",
  //     pk: 15,
  //   }
  // $scope.columns = "abcdef"
  // $scope.rows = "123456"
  // $scope.selectedTiles = []

  // $scope.selectedIndex = -2
  // $scope.titleLimit = 6

  $scope.columns = aacService.columns;
  $scope.rows = aacService.rows;
  $scope.selectedTiles = []
  $scope.selectedIndex = aacService.selectedIndex;
  $scope.titleLimit = aacService.titleLimit; 
  $scope.board = aacService.getBoards();

// var req = {
//   url: 'https://lexemes-dev.herokuapp.com/board/single/',
//   data: {pk: 3},
//   method: 'POST'
// }

// $http(req).success(function(data) {
//   $scope.board = data;
//   $scope.filled_tiles = Object.keys($scope.board.symbols)
// })
  
// $scope.testingService = function(){
//   aacService.showNames();
// }

$scope.chosenBoard = function(sampleBoard){
  $scope.selectedIndex = sampleBoard;
  if ($scope.dummyBoards[$scope.selectedIndex].pk == '3'){
    console.log("is this working?");
    console.log($scope.board.pk);
    var req = {
      url: 'https://lexemes-dev.herokuapp.com/board/single/',
      data: {pk: 3},
      method: 'POST'
    }

    $http(req).success(function(data) {
      $scope.board = data;
      $scope.filled_tiles = Object.keys($scope.board.symbols)
    })
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
    console.log("what about this??");
    console.log($scope.board.pk);
     var req2 = {
      url: 'https://lexemes-dev.herokuapp.com/board/single/',
      data: {pk: 4},
      method: 'POST'
    }

    $http(req2).success(function(data) {
      $scope.board = data;
      $scope.filled_tiles = Object.keys($scope.board.symbols)
    })

  }else{
    console.log("This icon doesn't have an associated board");
  }
}
  
  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };

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

  $ionicModal.fromTemplateUrl('templates/aac-partials/_color-modal.html',{
    id: '1',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.oModal1 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/aac-partials/_word-change.html',{
    id: '2',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.oModal2 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/aac-partials/_add-multiple-words.html',{
    id: '3',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.oModal3 = modal;
  });

  $scope.openModal = function(index){
    if(index == 1){
      $scope.oModal1.show();
    }else if(index == 2){
      $scope.oModal2.show();
    }else{
      $scope.oModal3.show();
    }
  }

  $scope.closeModal = function(index){
    if(index == 1){
      $scope.oModal1.hide();
    }else if(index == 2){
      $scope.oModal2.hide();
    }else{
      $scope.oModal3.hide();
    }
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
        $scope.oModal1.hide();
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

  $scope.dummyBoards =[

  { name:"About Me",
    img_path:"img/aac_board_imgs/crayon.png",
    pk: '5' },

  { name:"Lunch",
    img_path:"img/aac_board_imgs/alpaca.png",
    pk: '3' },

  { name:"Feelings",
    img_path:"img/aac_board_imgs/art.png",
    pk: '4' },

  { name:"Body",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Clothes",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Cars",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Feelings",
    img_path:"img/aac_board_imgs/crayon.png" },


  { name:"Food",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Kind Things",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Morning",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Number",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"People",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Places",
    img_path:"img/aac_board_imgs/crayon.png" },


  { name:"Reading",
    img_path:"img/aac_board_imgs/alpaca.png" },

  { name:"Sports",
    img_path:"img/aac_board_imgs/art.png" },

  { name:"Things",
    img_path:"img/aac_board_imgs/balloon.png" },

  { name:"Time",
    img_path:"img/aac_board_imgs/bird.png" },

  { name:"Verbs",
    img_path:"img/aac_board_imgs/clock.png" },

  { name:"Weather",
    img_path:"img/aac_board_imgs/crayon.png" },


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

  // added for sliding option
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
