// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var appConfig = angular.module('appConfig', []).constant('appConfig', {
    'backendURL': 'https://lexemes-prod.herokuapp.com'
})

angular.module('main', ['ionic', 'ngCordova', 'main.Ctrl', 'settings.Ctrl', 'main.aacService',
                        'boardFactory.Ctrl', 'Login.Ctrl', 'appConfig',
                        'sessionService', 'analyticService', 'angularMoment'])

.run(function($ionicPlatform, $ionicPopup, $state, $timeout,
  $location, $ionicHistory) {
      $ionicPlatform.ready(function() {
        try {
          window.analytics.startTrackerWithId('UA-54749327-1');

          db = window.sqlitePlugin.openDatabase({name: "my.aacdb", location: 'default'});

          db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Analytics (id integer primary key, category text, action text, label text)");
          });
        } catch(error) {
          console.log("Google Analytics Unavailable");
        }
      });
    if (!window.localStorage.username){
       $timeout(function() {
         $ionicHistory.currentView($ionicHistory.backView());
          $state.go('login', {}, {location: 'replace'});
       });
   }
    else{
      $timeout(function() {
          $ionicHistory.currentView($ionicHistory.backView());
          $state.go('main', {}, {location: 'replace'});
      });
    }
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
	
	$compileProvider.debugInfoEnabled(false);

  $urlRouterProvider.otherwise('/main');

  $stateProvider.state('main',{
    controller:'mainController',
    url: '/main',
    templateUrl: 'templates/main.html'
  })
  
  .state('login', {
    controller: 'LoginController',
    url: '/login',
    templateUrl: 'templates/login.html',
  })
  
  .state('settings',{
      controller: 'settingsController',
      url:'/settings',
      templateUrl: 'templates/settings.html'
    })
    
    .state('board_factory',{
    controller: 'boardFactoryController',
    url:'/board_factory',
    templateUrl: 'templates/board_factory.html'
  })
  
  .state('board_factory/:id',{
    controller: 'editBoardController',
    url:'/board_factory/edit/:id',
    templateUrl: 'templates/board_edit.html'
  })
  
  .state('board_factory/new',{
    controller: 'newBoardController',
    url:'/board_factory/new',
    templateUrl: 'templates/board_factory_new.html'
  })
});
