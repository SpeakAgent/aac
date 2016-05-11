// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.boards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home',{
      url: '/home',
      templateUrl: 'templates/home.html',
    });

  $stateProvider.state('settings',{
      url:'/settings',
      templateUrl: 'templates/settings.html',
    });

  $stateProvider.state('board_factory',{
    url:'/board_factory',
    templateUrl: 'templates/board_factory.html',
  })

  $stateProvider.state('board_factory/sample_edit',{
    url:'/board_factory/sample_edit',
    templateUrl: 'templates/sample_edit.html'
  })

  $stateProvider.state('board_factory/new',{
    url:'/board_factory/new',
    templateUrl: 'templates/board_factory_new.html'
  })
})
