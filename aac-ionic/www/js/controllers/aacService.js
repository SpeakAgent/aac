var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function($http, $ionicModal){
  
	this.title = "This is a title";
	this.board = {};
	this.board.title = "Home";
	this.columns = "abcdef";
	this.rows = "123456";
	this.selectedIndex = -2;
	this.titleLimit = 20;
  this.aacService = {};
  this.aacService.data = {};
  this.voice_volume = 150;
  this.synthetic_voice = 'FEMALE';

  // this.longWords = [
  //   {
  //     word:"puzzlement",
  //     image:"img/aac_board_imgs/crayon.png"
  //   },
  //   {
  //     word:"abdominohysterectomy",
  //     image:"img/aac_board_imgs/alpaca.png"
  //   },
  //   {
  //     word:"razzmatazz",
  //     image:"img/aac_board_imgs/art.png"
  //   },
  //   {
  //     word:"antienvironmentalist",
  //     image:"img/aac_board_imgs/balloon.png"
  //   },
  //   {
  //     word: "bumfuzzles",
  //     image:"img/aac_board_imgs/bird.png"
  //   },
  //   {
  //     word: "antiinsurrectionists",
  //     image:"img/aac_board_imgs/clock.png"
  //   },
  //   {
  //     word:"bemuzzling",
  //     image:"img/aac_board_imgs/crayon.png",
  //   },
  //   {
  //     word:"compartmentalization",
  //     image:"img/aac_board_imgs/alpaca.png",
  //   },
  //   {
  //     word:"skyjacking",
  //     image:"img/aac_board_imgs/art.png",
  //   },
  //   {
  //     word:"counterintuitiveness",
  //     image:"img/aac_board_imgs/balloon.png",
  //   },
  //   {
  //     word:"zigzagging",
  //     image:"img/aac_board_imgs/bird.png",
  //   },
  //   {
  //     word:"electrophysiologists",
  //     image:"img/aac_board_imgs/clock.png",
  //   },
  // ]

// }

    // this.board = {};
  // this.board.data = {};

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