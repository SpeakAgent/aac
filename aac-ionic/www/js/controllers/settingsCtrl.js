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
	$timeout, $window, $state, appConfig, aacService, sessionService){
		$scope.settings = true;
		$scope.step = 1;
		$scope.file = undefined;

		$scope.downloadBoard = function() {
			console.log("Downloading a board");
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
	        })
	        .error(function(error) {
	        	console.log("Could not download", error)
	        })
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
	}
);
