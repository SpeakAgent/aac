var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function($http, $ionicModal){
  
	this.title = "This is a title";
	this.board = {};
	this.board.title = "Home";
	this.columns = "abcdef";
	this.rows = "123456";
	this.selectedIndex = -2;
	this.titleLimit = 6;

  // this.board = {};
  // this.board.data = {};

  this.aacService = {};
  this.aacService.data = {};


  // this.aacService.getBoard = function(){
  //   var ureq = {
  //     url: "http://iamready.herokuapp.com/users/user/all/",
  //     data: {
  //       pk: localStorage.getItem('pk'),
  //       mode: "simple"
  //     },
  //     method: "POST",
  //     headers: {
  //       Authorization: 'JWT ' + localStorage.getItem('authToken')
  //     },
  //   }

  //   $http.get(ureq)
  //     .success(function(data){
  //       aacService.data.nukes = data;
  //       console.log(aacService.data.nukes);
  //     });

  //   return aacService;
  // } 
})