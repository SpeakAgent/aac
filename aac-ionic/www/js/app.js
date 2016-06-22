// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


angular.module('main', ['ionic', 'main.Ctrl', 'main.aacService'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    $stateProvider.state('main',{
        controller:'mainController',
        url: '/main',
        templateUrl: 'templates/main.html'
      });

    $stateProvider.state('settings',{
        url:'/settings',
        templateUrl: 'templates/settings.html',
      });

    $stateProvider.state('board_factory',{
      url:'/board_factory',
      templateUrl: 'templates/board_factory.html',
    })

    $stateProvider.state('board_factory/:id',{
      url:'/board_factory/sample_edit/:id',
      templateUrl: 'templates/sample_edit.html'
    })

    $stateProvider.state('board_factory/new',{
      url:'/board_factory/new',
      templateUrl: 'templates/board_factory_new.html'
    })
  })
