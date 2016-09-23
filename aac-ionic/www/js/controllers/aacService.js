var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function($http, $ionicModal){
  
	this.title = "This is a title";
	this.board = {};
	this.board.title = "Home";
	this.columns = "abcdef";
	this.rows = "123456";
	this.selectedIndex = -2;
	this.titleLimit = 6;
  this.aacService = {};
  this.aacService.data = {};

  this.dummyBoards =[

      { name:"About Me",
        img_path:"img/aac_board_imgs/crayon.png",
        pk: '5'},

      { name:"Lunch",
        img_path:"img/aac_board_imgs/alpaca.png",
        pk: '3'},

      { name:"Feelings",
        img_path:"img/aac_board_imgs/art.png",
        pk: '4'},

      { name:"Body",
        img_path:"img/aac_board_imgs/balloon.png"},

      { name:"Clothes",
         img_path:"img/aac_board_imgs/bird.png"},

     { name:"Cars",
       img_path:"img/aac_board_imgs/clock.png"},

      { name:"Feelings",
         img_path:"img/aac_board_imgs/crayon.png"},

     { name:"Food",
        img_path:"img/aac_board_imgs/alpaca.png"},

      { name:"Kind Things",
        img_path:"img/aac_board_imgs/art.png"},

      { name:"Morning",
        img_path:"img/aac_board_imgs/balloon.png"},

      { name:"Number",
        img_path:"img/aac_board_imgs/bird.png"},

      { name:"People",
        img_path:"img/aac_board_imgs/clock.png"},

      { name:"Places",
        img_path:"img/aac_board_imgs/crayon.png"},

      { name:"Reading",
        img_path:"img/aac_board_imgs/alpaca.png"},

      { name:"Sports",
        img_path:"img/aac_board_imgs/art.png"},

      { name:"Things",
        img_path:"img/aac_board_imgs/balloon.png"},

      { name:"Time",
        img_path:"img/aac_board_imgs/bird.png"},

      { name:"Verbs",
        img_path:"img/aac_board_imgs/clock.png"},

      { name:"Weather",
        img_path:"img/aac_board_imgs/crayon.png"},

      { name:"Nouns",
        img_path:"img/aac_board_imgs/alpaca.png"},

      { name:"Outdoor",
        img_path:"img/aac_board_imgs/art.png"},

      { name:"Animals",
        img_path:"img/aac_board_imgs/balloon.png"},

      { name:"Plants",
        img_path:"img/aac_board_imgs/bird.png"},

      { name:"Stuff",
        img_path:"img/aac_board_imgs/clock.png"},

      { name:"Things",
        img_path:"img/aac_board_imgs/crayon.png"},

      // added for sliding option
      { name:"Nouns",
        img_path:"img/aac_board_imgs/alpaca.png"},

      { name:"Outdoor",
        img_path:"img/aac_board_imgs/art.png"},

      { name:"Animals",
        img_path:"img/aac_board_imgs/balloon.png"},

      { name:"Plants",
         img_path:"img/aac_board_imgs/bird.png"},

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