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
	function($http, $scope, $cordovaFileTransfer,
	$timeout, $window, $state, appConfig, aacService, sessionService,
	$cordovaFile, $cordovaFileTransfer){
		$scope.settings = true;
		$scope.step = 1;
		$scope.file = undefined;
		$scope.downloadInProgress = false;
		$scope.statuses = [];

		$scope.downloadBoard = function() {
			$scope.statuses.unshift("=========")
            $scope.downloadInProgress = true;
            console.log("Downloading a board");
            $scope.statuses.unshift("Getting boards...")
            var req = {
              url: appConfig.backendURL + '/board/user/',
              data: {user_username: sessionService.get('username')},
              method: 'POST',
              headers: {
                Authorization: 'JWT ' + sessionService.get('authToken')
              }
            }

            console.log("Getting boards", req)

            $http(req).success(function(data) {
              $scope.board = data.boards[0];
              $scope.userBoards = data.boards;
              $scope.quickbar = data.quickbar;
              $scope.filled_tiles = Object.keys($scope.board.symbols)
              console.log("Got boards", data)
              sessionService.set('boards', angular.toJson(data));
              $scope.statuses.unshift("Have boards. # of boards: " + $scope.userBoards.length)
            })
            .error(function(error) {
                console.log("Could not download", error)
                $scope.statuses.unshift("Could not download the boards.")
                $scope.downloadInProgress = false;
            })
            .then(function () {
                saveBoardImages();  
            })
        }

        function saveBoardImages () {
          console.log("# boards", $scope.userBoards.length)
          for (var i in $scope.userBoards) {
            // Download board image
            var board = $scope.userBoards[i].board
            $scope.statuses.unshift("Getting images for " + board.title)
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
                  $scope.statuses.unshift("Saved file " + filename)
            }, function (error) {
                  console.log('Error Download file', JSON.stringify(error));
            }, function (progress) {
                  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            });
          });
        }

        function replaceImage (boardIndex, symbolIndex, targetPath, filename) {
        	$scope.downloadInProgress = false;
          console.log("Would be replacing",
            $scope.userBoards[boardIndex].board.title, symbolIndex,
            targetPath, filename)
          $scope.statuses.unshift("Replacing " + filename)
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
			sessionService.destroy('authToken');
			sessionService.destroy('username');
	        $state.go('login');
		};

		if (sessionService.get("username") === null) {
			$scope.doLogout();
		};

		$scope.getUserInformation = function(){
			req = {
				url: appConfig.backendURL + '/user/aac/settings/',
				method: 'POST',
				headers: {
				Authorization: 'JWT ' + sessionService.get('authToken')
				},
				data: {username: sessionService.get("username")}
			};
			$http(req).success(function (data) {
				$scope.user = data;
				var synthetic_voice = data.userinfo && data.userinfo.synthetic_voice != null? data.userinfo.synthetic_voice : 'FEMALE';
				var voice_speed  = data.userinfo && data.userinfo.voice_speed != null? (data.userinfo.voice_speed * 0.01).toFixed(2) : 1.5;
				sessionService.set('synthetic_voice', synthetic_voice);
				sessionService.set('voice_speed', voice_speed);
			})
		};

		$scope.synthVoiceSubmit = function(){
			user_req = {
				url: appConfig.backendURL + '/user/info/',
				method: 'POST',
				headers: {
					Authorization: 'JWT ' + sessionService.get('authToken'),
				},
				data: {username: sessionService.get("username"),
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
					Authorization: 'JWT ' + sessionService.get('authToken'),
				},
				data: {username: sessionService.get("username"),
					   profile_image: $scope.profileImgBase64,
					   profile_image_name: $scope.profileImgName}
			}
			return $http(user_req)
			.success(function(data) {
				var message = {
					text: data.message,
					type: 'success',
					animation: 'slideDown'
				};
				$window.scrollTo(0, 0);

				$scope.alertAnimation(message);
				$scope.getUserInformation();
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

		$scope.step = 6;

		$scope.panel = function(number){
			$scope.step = number;
		}

		$scope.settingsToMain = function(){
			$state.go('main');
		}
	}
);
