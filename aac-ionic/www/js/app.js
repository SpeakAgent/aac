// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var appConfig = angular.module('appConfig', []).constant('appConfig', {
    'backendURL': 'https://lexemes-dev.herokuapp.com'
})

angular.module('main', ['ionic', 'main.Ctrl', 'settings.Ctrl', 'main.aacService',
                        'boardFactory.Ctrl', 'Login.Ctrl', 'appConfig',
                        'sessionService', 'analyticService', 'angularMoment'])

.run(function($ionicPlatform, $ionicPopup) {
      $ionicPlatform.ready(function() {
        try {
          window.analytics.startTrackerWithId('UA-87583113-1');
        } catch(error) {
          console.log("Google Analytics Unavailable");
        }
      });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');

  $stateProvider.state('main',{
    controller:'mainController',
    url: '/main',
    templateUrl: 'templates/main.html'
  });

  $stateProvider.state('login', {
    controller: 'LoginController',
    url: '/login',
    templateUrl: 'templates/login.html',
  })

  $stateProvider.state('settings',{
      controller: 'settingsController',
      url:'/settings',
      templateUrl: 'templates/settings.html'
    });

  $stateProvider.state('board_factory',{
    controller: 'boardFactoryController',
    url:'/board_factory',
    templateUrl: 'templates/board_factory.html'
  })

  $stateProvider.state('board_factory/:id',{
    controller: 'editBoardController',
    url:'/board_factory/edit/:id',
    templateUrl: 'templates/board_edit.html'
  })

  $stateProvider.state('board_factory/new',{
    controller: 'newBoardController',
    url:'/board_factory/new',
    templateUrl: 'templates/board_factory_new.html'
  })
});
