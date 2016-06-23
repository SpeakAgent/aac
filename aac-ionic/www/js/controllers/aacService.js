var app = angular.module('main.aacService', ['ionic']);

app.service('aacService', function($http, $ionicModal){
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

   var content ={
    content: content
   }

	 this.content = function(){
    var board;

	 	var req = {
		  url: 'https://lexemes-dev.herokuapp.com/board/single/',
		  data: {pk: 3},
		  method: 'POST'
		}

    $http(req)
      .success(function(data){
        this.board = data; 
        this.filled_tiles = Object.keys(this.board.symbols);
      }).error(function(){
        console.log("Not Working");
      })

    return board;
    // return $http.post(req)
		// $http(req).success(function(data) {
		//   this.board = data;
		//   // console.log(this.board);
		//   this.filled_tiles = Object.keys(this.board.symbols)
		// })
	}

  // $ionicModal.fromTemplateUrl('templates/aac-partials/_color-modal.html',{
  //   id: '1',
  //   scope: this,
  //   animation: 'slide-in-up'
  // }).then(function(modal){
  //   this.oModal1 = modal;
  // });

  // $ionicModal.fromTemplateUrl('templates/aac-partials/_word-change.html',{
  //   id: '2',
  //   scope: this,
  //   animation: 'slide-in-up'
  // }).then(function(modal){
  //   this.oModal2 = modal;
  // });

  // $ionicModal.fromTemplateUrl('templates/aac-partials/_add-multiple-words.html',{
  //   id: '3',
  //   scope: this,
  //   animation: 'slide-in-up'
  // }).then(function(modal){
  //   $scope.oModal3 = modal;
  // });

  // this.openModal = function(index){
  //   if(index == 1){
  //     this.oModal1.show();
  //   }else if(index == 2){
  //     this.oModal2.show();
  //   }else{
  //     this.oModal3.show();
  //   }
  // }

  // this.closeModal = function(index){
  //   if(index == 1){
  //     this.oModal1.hide();
  //   }else if(index == 2){
  //     this.oModal2.hide();
  //   }else{
  //     this.oModal3.hide();
  //   }
  // };

  // this.$on('$destroy', function(){
  //   this.modal.remove();
  // });

})