var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function($http, $ionicModal){
  
	this.title = "This is a title";
	this.board = {};
	this.board.title = "Home";
	this.columns = "abcdef";
	this.rows = "123456";
	this.selectedIndex = -2;
	this.titleLimit = 6;

  this.board = {};

  this.getBoard = function(){
    var req = {
      url: 'https://lexemes-dev.herokuapp.com/board/single/',
      data: {pk: 3},
      method: 'POST'
    }

    $http.get(req)
      .success(function(data){
        this.board = data;
        console.log(this.board);
      });

    return this.board;
  } 
})