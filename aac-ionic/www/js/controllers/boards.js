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

app.controller('BoardController', function($http, $scope) {

  $scope.title = "This is a title";
  $scope.board = {};
  $scope.board.title = "Home";
  sample_symbol = {
      word: "Sample",
      icon: "img/symbols/a_lot.png",
      pk: 15,
  }
  $scope.board.symbols = [sample_symbol, sample_symbol, sample_symbol];
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