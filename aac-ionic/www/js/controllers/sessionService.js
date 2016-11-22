angular.module('sessionService', ['ionic'])

.factory('sessionService',['$http',function($http){
return {
   set:function(key,value){
      return localStorage.setItem(key,JSON.stringify(value));
   },
   get:function(key){
     try {
        return JSON.parse(localStorage.getItem(key));
    } catch(err) {
        return localStorage.getItem(key);
    }
   },
   destroy:function(key){
     return localStorage.removeItem(key);
   },
 };
}]);