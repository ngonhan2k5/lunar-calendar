var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  
  var dbo = db.db("amduong");
  console.log("Switched to "+dbo.databaseName+" database");
  if (err) throw err;

  // dbo.collection("memos").drop(function(){
    dbo.createCollection("memos", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      // dbo.collection("memos").createIndex( { "slug": 1 }, { unique: true } )
      dbo.collection("memos").createIndex( { "uid": 1 })

      dbo.createCollection("memos", function(err, res) {
        // console.log(err, res)
      })
      
      // db.close()
      var initMemos = require('./src/db')
        console.log(initMemos)
        
        var ret = dbo.collection("memos").insert(initMemos, function (err, res) {
            if (!err) 
                console.log("1 memo inserted")
            console.log(res, err)
            db.close()
        });
    
  })

  

  

  
  

  // db.close();
  
});

console.log(process.argv)
if (process.argv.indexOf('remove')>0){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("links").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  });
}