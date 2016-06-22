var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function($http){
  // var names = ['words', 'content', 'testing', 'whatever'];

  // this.showNames = function(){
  // 	for(i = 0; i < names.length; i++){
  // 		alert(names[i]);
  // 	}
  // }

	 this.title = "This is a title";
	 this.board = {};
	 this.board.title = "Home";
	 this.columns = "abcdef";
	 this.rows = "123456";
	 this.selectedIndex = -2;
	 this.titleLimit = 6;

	 this.getBoards = function(){
	 	var req = {
		  url: 'https://lexemes-dev.herokuapp.com/board/single/',
		  data: {pk: 3},
		  method: 'POST'
		}

		$http(req).success(function(data) {
		  this.board = data;
		  this.filled_tiles = Object.keys(this.board.symbols)
		})
	}

})