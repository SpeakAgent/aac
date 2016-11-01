var app = angular.module('Login.Ctrl', ['ionic', 'angular-jwt']);

app.controller('LoginController', function($scope, $http,
  $rootScope, $location, $ionicHistory, jwtHelper, appConfig, User){
  
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
    $rootScope.authToken = null;
    $scope.authToken = null;
    $scope.username= null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');

    $scope.$apply()
    $scope.User = User;
    $scope.User.username = null;

    var clearKeys = [
      'authToken',
      'username',
      'userProfile',
      'location.favorites',
    ];

    $location.path('/login');
  };

  $scope.getUserData = function(username) {
    user_req = {
      url: appConfig.backendURL + '/user/username/',
      method: 'POST',
      headers: {
        Authorization: 'JWT ' + localStorage.getItem('authToken')
      },
      data: {username: $scope.username}
    }
    return $http(user_req)
      .success(function(data) {
        localStorage.setItem('first_name', data.studentuser.first_name)
        localStorage.setItem('last_name', data.studentuser.last_name)
        localStorage.setItem('user_type', 'student')
      })
      .error(function (data) {
        $scope.errData = data
      });

    }

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
        $rootScope.authToken = data.token;
        $rootScope.username = $scope.loginData.username;

        localStorage.setItem('authToken', $rootScope.authToken);
        localStorage.setItem('username', $rootScope.username);
        localStorage.setItem('startSession', new Date().getTime());

        $http.defaults.headers.common.Authorization = 'Token ' + $rootScope.authToken;
        $scope.username = localStorage.getItem('username');
        $scope.authToken = localStorage.getItem('authToken');
        $scope.User = User;
        $scope.User.username = $scope.username;
        $rootScope.username = $scope.username;
        $scope.getUserData($scope.username).then(function(result) {        
          $location.path('/author/');
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
        })
    });

    responsePromise.error(function(data, status, headers, config) {
      $scope.loginError = "Unable to log in with the provided username and password.";
    });

  };
});

app.factory('User', function () {
  return {
    username: ''
  }
});
