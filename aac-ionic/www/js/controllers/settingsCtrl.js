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

		$scope.downloadBoard = function() {
			console.log("Downloading a board");
			var req = {
				url: "https://lexemes-dev.herokuapp.com/board/single/",
				data: {
					pk: 26
				},
				headers: {
					Authorization: 'JWT ' + localStorage.getItem('authToken')
				},
				method: "POST"
			}

			$http(req).success(function(data){
				$scope.dlboard = data;
				console.log($scope.dlboard.board.image);
				var url = $scope.dlboard.board.image;
				var targetPath = cordova.file.documentsDirectory + "testimg.png";
				var trustHosts = true;
				var options = {};

				$cordovaFileTransfer.download(url, targetPath, options, trustHosts)
			      .then(function(result) {
			        console.log("Done!", result)
			      }, function(err) {
			        console.log("Error", err)
			      }, function (progress) {
			        $timeout(function () {
			          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
			        });
			      });
			})
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

		$scope.step = 6;

		$scope.panel = function(number){
			$scope.step = number;
		}
	}
);
