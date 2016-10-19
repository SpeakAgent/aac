var app = angular.module('settings.Ctrl', ['ionic']);

app.controller('settingsController',
	function($http, $scope, $location){
		$scope.settings = true;
		$scope.step = 1;
		$scope.$on( "$ionicView.enter", function( scopes, states ) {
			
			console.log("Entered settings")
			$scope.appPrefs = {}
			// Only the ones we've implemented
			prefs = ['showPK']
			for (var i in prefs) {
			sval = window.localStorage.getItem(prefs[i])
			console.log("Found", prefs[i], sval)
			if (sval == null) {
				console.log("Is null")
				$scope.appPrefs[prefs[i]] = false
			} else {
				if (sval == "true") {
					$scope.appPrefs[prefs[i]] = true
				} else {
					$scope.appPrefs[prefs[i]] = false
				}
			}

			console.log($scope.appPrefs)
			
		}
		})

		
		

		$scope.setPreference = function(pref) {
			console.log($scope.appPrefs)
			window.localStorage.setItem(pref, $scope.appPrefs[pref])
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
