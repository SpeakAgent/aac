angular.module('analyticService', ['ionic'])

.factory('analyticService', ['$cordovaSQLite', '$cordovaNetwork',
         function($cordovaSQLite, $cordovaNetwork){
  return {
    view: function(title){
        try{
          window.analytics.trackView(title);
        }catch (error){

        }
    },
    event: function(category, action, label){
        try{
          if($cordovaNetwork.isOnline()){
            window.analytics.trackEvent(category, action, label);
          }else{
            db.transaction(function(tx) {
              tx.executeSql("INSERT INTO Analytics (category, action, label) VALUES (?,?,?)",
                [category, action, label]);
            });
          }
        }catch (error){

        }
    },
    uploadLocalEvents: function(){
        try{
          if($cordovaNetwork.isOnline()){            
            db.transaction(function(tx) {
              tx.executeSql("SELECT category, action, label FROM Analytics", [], function(tx, res) {
                  if(res.rows.length > 0) {                
                    for(var x=0; x < res.rows.length; x++){
                      window.analytics.trackEvent(
                        res.rows.item(x).category,
                        res.rows.item(x).action,
                        res.rows.item(x).label);

                      if(x == res.rows.length-1){
                        tx.executeSql("DELETE FROM Analytics");
                      }
                    }
                  }                  
              });              
            });

            return "Successfully inserted events on google analytics.";
          }else{
            return "No internet connection to upload event analytics."
          }
        }catch (error){
          return "An error ocurred doing event upload.";
        }
    },
  };
}]);