//var MongoClient = require('mongodb').MongoClient;

//var uri = "mongodb+srv://kay:user1@cluster0.mongodb.net/test";
//MongoClient.connect(uri, function(err, client) {
 
   // perform actions on the collection object
   //client.close();
//});

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
//var url = 'mongodb+srv://abhishek:spero@cluster0-xocma.mongodb.net/comments?retryWrites=true';
var url = "mongodb://localhost:27017/local";
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
   var dbo = db.db("local");
  var myobj = { abrasive: "abrupt" };
  dbo.collection("spero").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });

});