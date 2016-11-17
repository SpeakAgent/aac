angular.module('analyticService', ['ionic'])

.factory('analyticService', function(){
return {
   view: function(title){
      try{
        window.analytics.trackView(title);
      }catch (error){

      }
   },
   event: function(category, action, label){
      try{
        window.analytics.trackEvent(category, action, label);
      }catch (error){
        
      }
   },
   TileEvent: function(category, action, label){
      try{
        window.analytics.trackEvent(category, action, label);
      }catch (error){
        
      }
   },
   PhraseEvent: function(category, action, label){
      try{
        window.analytics.trackEvent(category, action, label);
      }catch (error){
        
      }
   },
 };
});