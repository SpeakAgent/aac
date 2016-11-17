angular.module('analyticService', ['ionic'])

.factory('analyticService', function(){
return {
   start: function(){
      try{
        analytics.startTrackerWithId('UA-87583113-1');
      }catch(error){
        
      }
   },
   view: function(title){
      try{
        analytics.trackView(title);
      }catch (error){

      }
   },
   event: function(category, action, label, value){
      try{
        analytics.trackEvent(category, action, label, Value);
      }catch (error){
        
      }
   },
 };
});