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

app.controller('BoardController', function($http, $scope, $ionicSideMenuDelegate, $ionicModal) {

  $scope.title = "This is a title";
  $scope.board = {};
  $scope.board.title = "Home";
  sample_symbol = {
      word: "Sample",
      icon: "img/symbols/a_lot.png",
      pk: 15,
  }
  $scope.board.symbols = [sample_symbol, sample_symbol, sample_symbol];

  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };

  // $scope.contact ={
  //   name: 'Mittens Cat',
  //   info: 'Tap anywhere on the card to open the modal'
  // }

  $scope.colorName =[
    {colorTitle: 'Sky Blue'},
    {colorTitle: 'Electric Green'},
    {colorTitle: 'Hot Pink'},
    {colorTitle: 'Tangerine'},
    {colorTitle: 'Butter Yellow'},
    {colorTitle: 'Tomato Red'},
    {colorTitle: 'Denim Blue'},
    {colorTitle: 'Steel Gray'},
    {colorTitle: 'Periwinkle Blue'},
    {colorTitle: 'Forest Green'},
    {colorTitle: 'Intense Purple'},
    {colorTitle: 'Seafoam Green'},
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

  $scope.dummyBoards =[
  { 
    name:"Anmls",
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