var app = angular.module('settings.Ctrl', ['ionic']);

app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});

app.controller('settingsController',
	function($http, $scope, $cordovaFileTransfer, $location, $timeout, $window, appConfig){
		$scope.settings = true;
		$scope.step = 1;
		$scope.file = undefined;
		$scope.downloadInProgress = false;

		$scope.Download = function (url, boardIndex, symbolIndex) {
	      if (url === null) {
	        return null
	      }
	      ionic.Platform.ready(function(){
	        var filename = url.split("/").pop()
	        console.log("filename 1", filename)
	        filename = filename.split("?")[0]
	        console.log("filename 2", filename)
	        console.log(url.split("/"))
	        url = url.split("?")[0]

	       var targetPath = cordova.file.applicationDirectory + "www/img/" + filename;
	        $cordovaFileTransfer.download(
	          url, 
	          targetPath, 
	          {}, 
	          true)
	        .then(function (result) {
	              console.log('Save file on '+targetPath+' success!');
	              replaceImage(boardIndex, symbolIndex, targetPath, filename);
	        }, function (error) {
	              console.log('Error Download file', JSON.stringify(error));
	        }, function (progress) {
	              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
	        });
	      });
	    }

		$scope.downloadBoard = function() {
			$scope.downloadInProgress = true;
			console.log("Downloading a board");
			var req = {
	          url: appConfig.backendURL + '/board/user/',
	          data: {user_username: localStorage.getItem('username')},
	          method: 'POST',
	          headers: {
	            Authorization: 'JWT ' + localStorage.getItem('authToken')
	          }
	        }

	        console.log("Getting boards", req)

	        $http(req).success(function(data) {
	          $scope.board = data.boards[0];
	          $scope.userBoards = data.boards;
	          $scope.quickbar = data.quickbar;
	          $scope.filled_tiles = Object.keys($scope.board.symbols)
	          console.log("Got boards", data)
	          window.localStorage['boards'] = angular.toJson(data);
	          // $scope.downloadInProgress = false;
	        })
	        .error(function(error) {
	        	console.log("Could not download", error)
	        	$scope.downloadInProgress = false;
	        })
	        .then(function () {
          		saveBoardImages();
          		$scope.downloadInProgress = false;	
        	})
		}

		function saveBoardImages () {
	      console.log("# boards", $scope.userBoards.length)
	      for (var i in $scope.userBoards) {
	        // Download board image
	        var board = $scope.userBoards[i].board
	        var symbols = $scope.userBoards[i].symbols
	        // console.log(JSON.stringify(board))
	        console.log("Downloading", board.title, 
	          board.image)
	        $scope.Download(board.image, i, null)
	        // Now, download the board tile images
	        console.log("Symbols", JSON.stringify(symbols))
	        for (var si in symbols) {
	          console.log("Symbol index", si)
	          $scope.Download(symbols[si].symbol.image, i, si)
	        }
	      }
	    }

	    function replaceImage (boardIndex, symbolIndex, targetPath, filename) {
	      console.log("Would be replacing",
	        $scope.userBoards[boardIndex].board.title, symbolIndex,
	        targetPath, filename)
	      if (symbolIndex === null && boardIndex !== null) {
	        // We're just replacing the board image
	        $cordovaFile.readAsDataURL(
	          cordova.file.applicationDirectory, "www/img/" + filename)
	          .then(function(res) {
	            // console.log("Implanting apple on", boardIndex, $scope.userBoards[boardIndex].board.title)
	            $scope.userBoards[boardIndex].board.image = res;
	            $scope.userBoards[boardIndex].board.thumb = res;

	          })
	      } else if (boardIndex !== null && symbolIndex !== null ) {
	          // If we have a board and a symbol, replace the symbol
	          console.log("Replacing a symbol", boardIndex, symbolIndex, targetPath,
	            filename)
	          $cordovaFile.readAsDataURL(
	          cordova.file.applicationDirectory, "www/img/" + filename)
	          .then(function(res) {
	            console.log("Implanting apple on symbol", 
	              boardIndex, symbolIndex, 
	              $scope.userBoards[boardIndex].symbols[symbolIndex])
	            $scope.userBoards[boardIndex].symbols[symbolIndex].symbol.image = res;
	            $scope.userBoards[boardIndex].symbols[symbolIndex].symbol.thumb = res;

	          })
	        } else if (boardIndex === null && symbolIndex !== null) {
	          // We have no board, but a symbol? Quickbar
	          console.log("Replacing a quickbar", boardIndex, symbolIndex, targetPath,
	            filename)
	          $cordovaFile.readAsDataURL(
	          cordova.file.applicationDirectory, "www/img/" + filename)
	          .then(function(res) {
	            console.log("Implanting apple on symbol", 
	              boardIndex, symbolIndex, 
	              $scope.userBoards[boardIndex].symbols[symbolIndex])
	            $scope.quickbar[symbolIndex].symbol.image = res;
	            $scope.userBoards[boardIndex].symbols[symbolIndex].symbol.thumb = res;
	        })

	      }

	        window.localStorage['boards'] = angular.toJson(
	          {'boards': $scope.userBoards,
	           'quickbar': $scope.quickbar});
	    }
		
		$scope.alertAnimation = function(message){
			$scope.message = message;
   		    $timeout(function(){$scope.message = null}, 2700);
		}

		$scope.doLogout = function() {
			localStorage.removeItem('authToken');
			localStorage.removeItem('username');
			localStorage.removeItem('first_name');
			localStorage.removeItem('last_name');
	         $location.path('/login');
		};

		if (localStorage.getItem("username") === null) {
			$scope.doLogout();
		};

		$scope.getUserInformation = function(){
			req = {
				url: appConfig.backendURL + '/user/aac/settings/',
				method: 'POST',
				headers: {
				Authorization: 'JWT ' + localStorage.getItem('authToken')
				},
				data: {username: localStorage.getItem("username")}
			};
			$http(req).success(function (data) {
				$scope.user = data;
				console.log(data);
			})
		};

		$scope.synthVoiceSubmit = function(){
			user_req = {
				url: appConfig.backendURL + '/user/info/',
				method: 'POST',
				headers: {
					Authorization: 'JWT ' + localStorage.getItem('authToken'),
				},
				data: {username: localStorage.getItem("username"),
					   synthetic_voice: this.user.userinfo.synthetic_voice,
					   voice_speed: this.user.userinfo.voice_speed}
			}
			return $http(user_req)
			.success(function(data) {
				$scope.getUserInformation();
				var message = {
					text: 'Synthetic Voice options was saved successfully.',
					type: 'success',
					animation: 'slideDown'
				};

				$scope.alertAnimation(message);
			})
			.error(function (data) {
				$window.scrollTo(0, 0);
				var message = {
					text: 'An error ocurred updating user information!',
					type: 'danger',
					animation: 'slideDown'
				};
				$scope.alertAnimation(message);
			});
		}

		$scope.getUserInformation();

		$scope.uploadFile = function(e){
			var image = e.target.files[0];
			var read = new FileReader();

			$scope.profileImgName = e.target.files[0].name

			imageUrl = e.target.files[0]

			read.onloadend = function(evt) {
				result_base64 = evt.target.result;
				$scope.profileImgBase64 = btoa(read.result);
			};
			read.readAsBinaryString(image);
		};

		$scope.SubmitAboutMe = function(){
			user_req = {
				url: appConfig.backendURL + '/user/info/',
				method: 'POST',
				headers: {
					Authorization: 'JWT ' + localStorage.getItem('authToken'),
				},
				data: {username: localStorage.getItem("username"),
					   profile_image: $scope.profileImgBase64,
					   profile_image_name: $scope.profileImgName}
			}
			return $http(user_req)
			.success(function(data) {
				$scope.getUserInformation();
				var message = {
					text: data.message,
					type: 'success',
					animation: 'slideDown'
				};
				$window.scrollTo(0, 0);

				$scope.alertAnimation(message);
			})
			.error(function (data) {
				$window.scrollTo(0, 0);
				var message = {
					text: 'An error ocurred updating user information!',
					type: 'danger',
					animation: 'slideDown'
				};
				$scope.alertAnimation(message);
			});
		}

		$scope.panel = function(number){
		  if(number == "1"){
		    var self = document.getElementById("settings");
		    self.style.backgroundColor = "#008485";
		    self.style.color = "white";
		    $scope.step = 1;
		      var synthetic = document.getElementById("synthetic");
		      synthetic.style.backgroundColor = "white";
		      synthetic.style.color = "black";

		      var sound = document.getElementById("sound");
		      sound.style.backgroundColor = "white";
		      sound.style.color = "black";

		      var phrase = document.getElementById("phrase");
		      phrase.style.backgroundColor = "white";
		      phrase.style.color = "black";

		      var alternate = document.getElementById("alternate");
		      alternate.style.backgroundColor = "white";
		      alternate.style.color = "black";

		      var aboutMe = document.getElementById("aboutMe");
		      aboutMe.style.backgroundColor = "white";
		      aboutMe.style.color = "black";
		  } else if(number == "2"){
		      var self = document.getElementById("synthetic");
		      self.style.backgroundColor = "#008485";
		      self.style.color = "white";
		      $scope.step = 2;

		      var settings = document.getElementById("settings");
		      settings.style.backgroundColor = "white";
		      settings.style.color = "black";

		      var sound = document.getElementById("sound");
		      sound.style.backgroundColor = "white";
		      sound.style.color = "black";

		      var phrase = document.getElementById("phrase");
		      phrase.style.backgroundColor = "white";
		      phrase.style.color = "black";

		      var alternate = document.getElementById("alternate");
		      alternate.style.backgroundColor = "white";
		      alternate.style.color = "black";

		      var aboutMe = document.getElementById("aboutMe");
		      aboutMe.style.backgroundColor = "white";
		      aboutMe.style.color = "black";

		  } else if(number == "3"){
		      var self = document.getElementById("sound");
		      self.style.backgroundColor = "#008485";
		      self.style.color = "white";
		      $scope.step = 3;

		      var synthetic = document.getElementById("synthetic");
		      synthetic.style.backgroundColor = "white";
		      synthetic.style.color = "black";

		      var settings = document.getElementById("settings");
		      settings.style.backgroundColor = "white";
		      settings.style.color = "black";

		      var phrase = document.getElementById("phrase");
		      phrase.style.backgroundColor = "white";
		      phrase.style.color = "black";

		      var alternate = document.getElementById("alternate");
		      alternate.style.backgroundColor = "white";
		      alternate.style.color = "black";

		      var aboutMe = document.getElementById("aboutMe");
		      aboutMe.style.backgroundColor = "white";
		      aboutMe.style.color = "black";

		  } else if(number == "4"){
		      var self = document.getElementById("phrase");
		      self.style.backgroundColor = "#008485";
		      self.style.color = "white";
		      $scope.step = 4;

		      var synthetic = document.getElementById("synthetic");
		      synthetic.style.backgroundColor = "white";
		      synthetic.style.color = "black";

		      var sound = document.getElementById("sound");
		      sound.style.backgroundColor = "white";
		      sound.style.color = "black";

		      var settings = document.getElementById("settings");
		      settings.style.backgroundColor = "white";
		      settings.style.color = "black";

		      var alternate = document.getElementById("alternate");
		      alternate.style.backgroundColor = "white";
		      alternate.style.color = "black";

		      var aboutMe = document.getElementById("aboutMe");
		      aboutMe.style.backgroundColor = "white";
		      aboutMe.style.color = "black";

		  } else if(number == "5"){
		      var self = document.getElementById("alternate");
		      self.style.backgroundColor = "#008485";
		      self.style.color = "white";
		      $scope.step = 5;

		      var synthetic = document.getElementById("synthetic");
		      synthetic.style.backgroundColor = "white";
		      synthetic.style.color = "black";

		      var sound = document.getElementById("sound");
		      sound.style.backgroundColor = "white";
		      sound.style.color = "black";

		      var phrase = document.getElementById("phrase");
		      phrase.style.backgroundColor = "white";
		      phrase.style.color = "black";

		      var settings = document.getElementById("settings");
		      settings.style.backgroundColor = "white";
		      settings.style.color = "black";

		      var aboutMe = document.getElementById("aboutMe");
		      aboutMe.style.backgroundColor = "white";
		      aboutMe.style.color = "black";

		  }else if(number == "6"){
		      var self = document.getElementById("aboutMe");
		      self.style.backgroundColor = "#008485";
		      self.style.color = "white";
		      $scope.step = 6;

		      var synthetic = document.getElementById("synthetic");
		      synthetic.style.backgroundColor = "white";
		      synthetic.style.color = "black";

		      var sound = document.getElementById("sound");
		      sound.style.backgroundColor = "white";
		      sound.style.color = "black";

		      var phrase = document.getElementById("phrase");
		      phrase.style.backgroundColor = "white";
		      phrase.style.color = "black";

		      var settings = document.getElementById("settings");
		      settings.style.backgroundColor = "white";
		      settings.style.color = "black";

		      var alternate = document.getElementById("alternate");
		      alternate.style.backgroundColor = "white";
		      alternate.style.color = "black";

		  } else if(number == "11"){
		      var self = document.getElementById("aboutMe");
		      self.style.backgroundColor = "#008485";
		      self.style.color = "white";
		      $scope.step = 11;

		      var synthetic = document.getElementById("synthetic");
		      synthetic.style.backgroundColor = "white";
		      synthetic.style.color = "black";

		      var sound = document.getElementById("sound");
		      sound.style.backgroundColor = "white";
		      sound.style.color = "black";

		      var phrase = document.getElementById("phrase");
		      phrase.style.backgroundColor = "white";
		      phrase.style.color = "black";

		      var settings = document.getElementById("settings");
		      settings.style.backgroundColor = "white";
		      settings.style.color = "black";

		      var alternate = document.getElementById("alternate");
		      alternate.style.backgroundColor = "white";
		      alternate.style.color = "black";

		  } else {
		    console.log("This isn't working either?!? God!?!?");
		  }
		}
	}
);
