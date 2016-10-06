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
	function($http, $scope, $location, $timeout, $window, appConfig){
		$scope.settings = true;
		$scope.step = 1;
		$scope.file = undefined;
		
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
				url: appConfig.backendURL + '/user/username/',
				method: 'POST',
				headers: {
				Authorization: 'JWT ' + localStorage.getItem('authToken')
				},
				data: {username: localStorage.getItem("username")}
			};
			$http(req).success(function (data) {
				$scope.user = data;
			})
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

		  } else {
		    console.log("This isn't working either?!? God!?!?");
		  }
		}
	}
);
