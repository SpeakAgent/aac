var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function(){
  var names = ['words', 'content', 'testing', 'whatever'];

  this.showNames = function(){
  	for(i = 0; i < names.length; i++){
  		alert(names[i]);
  	}
  }
})