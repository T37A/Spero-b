var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
//var url = 'mongodb+srv://abhishek:spero@cluster0-xocma.mongodb.net/comments?retryWrites=true';
var url = "mongodb://localhost:27017/local";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("local");
  var query = { abrasive: "abrupt" };
  dbo.collection("SPERO").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});