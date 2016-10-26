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

  this.dummyBoards =[

      { name:"Verbs",
        img_path:"img/dummyImages/verbs.png",
        pk: '4'},

      { name:"Lunch",
        img_path:"img/dummyImages/lunch.png",
        pk: '2'},

      { name:"Feelings",
        img_path:"img/dummyImages/feelings.png",
        pk: '1'},

      { name:"About Me",
        img_path:"img/dummyImages/about_me.png",
        pk: '5'},

      { name:"Clothes",
         img_path:"img/aac_board_imgs/bird.png"},

     { name:"Cars",
       img_path:"img/aac_board_imgs/clock.png"},

      { name:"Art",
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
})