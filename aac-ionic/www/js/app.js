// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// (function(){

// (function(){
  var app = angular.module('starter', ['ionic', 'starter.mainCtrl']);

  app.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/main');

    $stateProvider.state('main',{
      templateUrl: 'templates/main.html',
      url: '/main',
      controller:'mainCtrl'
    });

    $stateProvider.state('settings',{
      templateUrl: 'templates/settings.html',
      url:'/settings'
    });

    $stateProvider.state('board_factory',{
      templateUrl: 'templates/board_factory.html',
      url:'/board_factory'
    });

    $stateProvider.state('board_factory/:id',{
      templateUrl: 'templates/sample_edit.html',
      url:'/board_factory/sample_edit/:id'
    });

    $stateProvider.state('board_factory/new',{
      templateUrl: 'templates/board_factory_new.html',
      url:'/board_factory/new'
    });

    $urlRouterProvider.otherwise('/main');
  });

  app.run(function($rootScope, $state, $ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
// })
