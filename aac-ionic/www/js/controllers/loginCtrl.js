var app = angular.module('Login.Ctrl', ['ionic', 'angular-jwt']);

app.controller('LoginController', function($scope, $http, $location,
  jwtHelper, appConfig, aacService){
  
  if(localStorage.getItem('username') && localStorage.getItem('username')){
      $location.path('/main');
  }

  $scope.loginData = {};
  $scope.authToken = localStorage.getItem('authToken');
  if ($scope.authToken) {
    $scope.username = jwtHelper.decodeToken($scope.authToken).username;
  }

  //Perform logout
  $scope.doLogout = function(data, status, headers, config) {
    $scope.authToken = null;
    $scope.username= null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');

    $scope.$apply()

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $location.path('/login');
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
      debugger;
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', $scope.loginData.username);
      localStorage.setItem('startSession', new Date().getTime());

      $http.defaults.headers.common.Authorization = 'Token ' + data.token;

      $location.path('/author/');
    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };
});
