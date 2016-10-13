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

    this.aboutMeBoard = {
      "title" :"About Me",
      "symbols" : {
        "a1" : {
          "lexeme" : "Nickname",
          "symbol" : {
            "pk" : "0000",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/I.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/I.png",
          },
          "word": "nickname",
          "pk" : "",
          "hidden": "false",
        },
        "b1" : {
          "lexeme" : "Birthday",
          "symbol" : {
            "pk" : "0001",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/bunny.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/bunny.png",
          },
          "word": "birthday",
          "pk" : "",
          "hidden": "false",
        },
        "c1" : {
          "lexeme" : "Hometown",
          "symbol" : {
            "pk" : "0002",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/painting.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/painting.png",
          },
          "word": "hometown",
          "pk" : "",
          "hidden": "false",
        },
        "d1" : {
          "lexeme" : "Name of best friend",
          "symbol" : {
            "pk" : "0003",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/I.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/I.png",
          },
          "word": "best friend",
          "pk" : "",
          "hidden": "false",
        },
        "e1" : {
          "lexeme" : "Siblings",
          "symbol" : {
            "pk" : "0004",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/fun.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/fun.png",
          },
          "word": "siblings",
          "pk" : "",
          "hidden": "false",
        },
        "f1" : {
          "lexeme" : "Pets",
          "symbol" : {
            "pk" : "0005",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/bunny.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/bunny.png",
          },
          "word": "pets",
          "pk" : "",
          "hidden": "false",
        },
        "a2" : {
          "lexeme" : "Gender",
          "symbol" : {
            "pk" : "0006",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/I.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/I.png",
          },
          "word": "gender",
          "pk" : "",
          "hidden": "false",
        },
        "b2" : {
          "lexeme" : "Age",
          "symbol" : {
            "pk" : "0007",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/painting.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/painting.png",
          },
          "word": "age",
          "pk" : "",
          "hidden": "false",
        },
        "c2" : {
          "lexeme" : "Favorite Toy",
          "symbol" : {
            "pk" : "0008",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/sports.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/sports.png",
          },
          "word": "toy",
          "pk" : "",
          "hidden": "false",
        },
        "d2" : {
          "lexeme" : "Hobby",
          "symbol" : {
            "pk" : "0009",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/book_reading.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/book_reading.png",
          },
          "word": "hobby",
          "pk" : "",
          "hidden": "false",
        },
        "e2" : {
          "lexeme" : "Favorite sports team",
          "symbol" : {
            "pk" : "0010",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/sports.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/sports.png",
          },
          "word": "sports",
          "pk" : "",
          "hidden": "false",
        },
        "f2" : {
          "lexeme" : "Favorite food",
          "symbol" : {
            "pk" : "0011",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/food.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/food.png",
          },
          "word": "food",
          "pk" : "",
          "hidden": "false",
        },
        "a3" : {
          "lexeme" : "Favorite ice cream",
          "symbol" : {
            "pk" : "0012",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/food.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/food.png",
          },
          "word": "ice cream",
          "pk" : "",
          "hidden": "false",
        },
        "b3" : {
          "lexeme" : "Favorite color",
          "symbol" : {
            "pk" : "0013",
            "title" : "",
            "alt_text" : "",
            "image" : "img/aac_board_imgs/fakejsonimg/painting.png",
            "thumb" : "img/aac_board_imgs/fakejsonimg/painting.png",
          },
          "word": "color",
          "pk" : "",
          "hidden": "false",
        }
      }
    }

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