var app = angular.module('Login.Ctrl', ['ionic', 'angular-jwt']);

app.controller('LoginController', function($scope, $http, $location,
  $state, jwtHelper, appConfig, aacService, sessionService, $ionicHistory){
  $ionicHistory.clearHistory();
  $ionicHistory.clearCache();

  if(sessionService.get('username')){
      $state.go('main');
  }

  $scope.loginData = {};
  $scope.authToken = sessionService.get('authToken');
  if ($scope.authToken) {
    $scope.username = jwtHelper.decodeToken($scope.authToken).username;
  }

  //Perform logout
  $scope.doLogout = function(data, status, headers, config) {
    $scope.authToken = null;
    $scope.username= null;
    sessionService.destroy('authToken');
    sessionService.destroy('username');
    sessionService.destroy('boards');

    $scope.$apply()

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $state.go('login');
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.loginData.username = $scope.loginData.username.toLowerCase();
    $scope.loginError = '';

    // Handle login
    var tokenAuthURL = appConfig.backendURL + '/api-token-auth/';
    var responsePromise = $http.post(tokenAuthURL,
      {
        'username': $scope.loginData.username,
        'password': $scope.loginData.password
      });

    responsePromise.success(function(data, status, headers, config) {
      sessionService.set('authToken', data.token);
      sessionService.set('username', $scope.loginData.username);
      sessionService.set('startSession', new Date().getTime());

      $http.defaults.headers.common.Authorization = 'Token ' + data.token;

      $state.go('main');
    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };
});
