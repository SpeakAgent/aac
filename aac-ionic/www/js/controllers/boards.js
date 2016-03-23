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

var app = angular.module('AAC', ['ionic']);

app.controller('BoardController', 
  function($http, $scope, $ionicSideMenuDelegate, $ionicModal, $element) {

  $scope.columns = "abcdefgh"
  $scope.rows = "123456"

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
     url:'img/color_change/colorBlob-skyBlue.svg' },

    {colorTitle: 'Electric Green',
     primaryColor:'#BCE72B', 
     secondaryColor:'#18745C', 
     url:'img/color_change/colorBlob_electricGreen.svg' },

    {colorTitle: 'Hot Pink',
     primaryColor:'#D5388A',
     secondaryColor:'#F787C6', 
     url:'img/color_change/colorBlob_hotPink.svg' },

    {colorTitle: 'Tangerine',
     primaryColor:'#E07600',
     secondaryColor:'#982900', 
     url:'img/color_change/colorBlob_tangerine.svg' },

    {colorTitle: 'Butter Yellow',
     primaryColor:'#FFDB3B',
     secondaryColor:'#DEC75F',
     url:'img/color_change/colorBlob_butterYellow.svg' },

    {colorTitle: 'Tomato Red',
     primaryColor:'#E6213F',
     secondaryColor:'#E899A6',
     url:'img/color_change/colorBlob_tomatoRed.svg' },

    {colorTitle: 'Denim Blue',
     primaryColor:'#325DC1',
     secondaryColor:'#ADB1E8',
     url:'img/color_change/colorBlob_denimBlue.svg' },

    {colorTitle: 'Steel Gray',
     primaryColor:'#7D989A',
     secondaryColor:'#A9CED1',
     url:'img/color_change/colorBlob_steelGray.svg' },

    {colorTitle: 'Periwinkle Blue',
     primaryColor:'#8AB6E1',
     secondaryColor:'#3496C7', 
     url:'img/color_change/colorBlob_periwinkleBlue.svg' },

    {colorTitle: 'Forest Green',
     primaryColor:'#18745C',
     secondaryColor:'#7BB59F',
     url:'img/color_change/colorBlob_forestGreen.svg'  },

    {colorTitle: 'Intense Purple',
     primaryColor:'#6B28C6',
     secondaryColor:'#C6A4EB',
     url:'img/color_change/colorBlob_intensePurple.svg'  },

    {colorTitle: 'Seafoam Green',
     primaryColor:'#2FCB95',
     secondaryColor:'#A7E8C5',
     url:'img/color_change/colorBlob_seafoamGreen.svg'  },
  ]
  

  $ionicModal.fromTemplateUrl('contact-modal.html',{
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
    // console.log($scope.colorName[$scope.selectedIndex].primaryColor);
    // console.log($scope.title);
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

      for(var i = 0; i < buttonCircle.length; i++){
        buttonCircle[i].style.backgroundColor = $scope.colorName[$scope.selectedIndex].secondaryColor;
      }

    // var activeColor = document.getElementsByClassName('.selectedColor');
    // console.log(activeColor);
    // activeColor.style.backgroundColor = "black";
    // var colorChoice = document.getElementsByClassName('color-choice');
    // console.log(colorChoice[$scope.selectedIndex].style.backgroundColor = 'black');
  }

  $scope.changeBackground = function(){
    console.log("This is working");
    // var bodyBack = document.getElementById('bodyBack')
    // bodyBack.style.backgroundColor = 'green';
    $scope.modal.hide();
  }

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
  // { name:"Nouns",
  //   img_path:"img/aac_board_imgs/alpaca.png" },

  // { name:"Outdr",
  //   img_path:"img/aac_board_imgs/art.png" },

  // { name:"Animl",
  //   img_path:"img/aac_board_imgs/balloon.png" },

  // { name:"Plnts",
  //   img_path:"img/aac_board_imgs/bird.png" },

  // { name:"Stuf",
  //   img_path:"img/aac_board_imgs/clock.png" },

  // { name:"Thngs",
  //   img_path:"img/aac_board_imgs/crayon.png"},
  ]
});

// app.controller('ionSideMenus', function($http, $scope, $ionicSideMenuDelegate){
//   $scope.toggleLeft = function(){
//     $ionicSideMenuDelegate.toggleLeft();
//   };
// })

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