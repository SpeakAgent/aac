angular.module('analyticService', ['ionic'])

.service('analyticService', ['$cordovaSQLite', function($cordovaSQLite){
return {
   view: function(title){
      try{
        window.analytics.trackView(title);
      }catch (error){

      }
   },
   event: function(category, action, label){
      try{
        // window.analytics.trackEvent(category, action, label);

        console.log('test');
        // console.log($cordovaNetwork.isOnline());

        db.transaction(function(tx) {
          var query = "INSERT INTO Analytics (category, action, label) VALUES (?,?,?)";

          tx.executeSql(query, [category, action, label], function(tx, res) {
              console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
              console.error(err);
          });

          tx.executeSql("SELECT category, action, label FROM Analytics", [], function(tx, res) {
            console.log("SELECTED -> " + res.rows.item(0).category + " " + res.rows.item(0).action, res.rows.item(0).label);
          });
        });
      }catch (error){
        console.log("errorrrrr");
      }
   },
   PhraseEvent: function(category, action, label){
      try{
        // window.analytics.trackEvent(category, action, label);

        console.log('test');
        // console.log($cordovaNetwork.isOnline());

        db.transaction(function(tx) {
          var query = "INSERT INTO Analytics (category, action, label) VALUES (?,?,?)";

          tx.executeSql(query, [category, action, label], function(tx, res) {
              console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
              console.error(err);
          });

          tx.executeSql("SELECT category, action, label FROM Analytics", [], function(tx, res) {
            console.log("SELECTED -> " + res.rows.item(0).category + " " + res.rows.item(0).action, res.rows.item(0).label);
          });
        });
      }catch (error){
        console.log("errorrrrr");
      }
   },
  //  uploadAnalytics: function(){
  //     try{
  //       var query = "SELECT category, action, label FROM Analytics";
          //tx.executeSql(db, query, []).then(function(res) {
  //           if(res.rows.length > 0) {
  //               console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                
  //               // for(var x=0; x < res.rows.length; x++){
  //               //   window.analytics.event(
  //               //     res.rows.item(x).firstname,
  //               //     res.rows.item(x).action,
  //               //     res.rows.item(x).label);
  //               // }
  //           } else {
  //               console.log("No results found");
  //           }
  //       });

  //     }catch (error){
        
  //     }
  //  },
 };
}]);