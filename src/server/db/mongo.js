var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/";

const db = {
    saveMemo : (uid, memo) => {
        
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) throw err
            var dbo = db.db("amduong")
            //var link = { slug:slug, url:url }
            memo.uid = uid
            dbo.collection("memos").insertOne(memo, function (err, res) {
                if (!err) 
                    console.log("1 memo inserted")
                db.close()
            });
        });

    },
    removeMemo : (uid, id) => {
        
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) throw err
            var dbo = db.db("amduong")
            //var link = { slug:slug, url:url }
            memo.uid = uid
            dbo.collection("memos").insertOne(memo, function (err, res) {
                if (!err) 
                    console.log("1 memo inserted")
                db.close()
            });
        });

    },
    fetchMemos : (uid) => {
        console.log("Find", uid)
        return new Promise((resolve, reject) => {
            MongoClient.connect(mongoUrl, function(err, db) {
                if (err || !db) 
                    reject(err)
                
                var dbo = db.db("amduong");
                dbo.collection("memos").find({uid:uid}).toArray( (err, results) => {
                    db.close()
                  if (err) {
                        reject(err)
                  }else{
                        console.log(results)
                        resolve(results)
                  }
                  
                  
                });
              });
        })
        
    }
}
export default db