// (function() {

angular.module('starter', ['ionic']);

// app.filter('slice', function(){
//   return function(arr, start, end){
//     return arr.slice(start, end);
//   };
// });

.controller('reusedCtrl'
  function($http, $scope, $ionicModal, $rootScope){
    $scope.board = {};
    // $scope.board.title = "Home";
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

    $scope.start = 0;
    $scope.end = 24;

    var req = {
      url: 'https://lexemes-dev.herokuapp.com/board/single/',
      data: {pk: 3},
      method: 'POST'
    }

    $http(req).success(function(data) {
      $scope.board = data;
      $scope.filled_tiles = Object.keys($scope.board.symbols)
    })

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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
                "thumb" : "",
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
          $scope.modal.hide();
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

    $scope.activeHide = function(){
      console.log("So, it works ...");
      if($scope.class === "none"){
        $scope.class = "selected-btn2";
         $scope.hide = true;
      }
    }

    $scope.hideDone = function(){
      if($scope.class === "selected-btn2"){
        $scope.class = "none";
        $scope.hide = false;
      }
    }
  })
// });