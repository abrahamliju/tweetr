"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  // db.collection("tweets2").find({}, (err, result) => {
  //   if(err) throw err;
  //
  //   // result.each((err, item) => console.log("", item));
  //   // db.close();
  //   result.toArray((err, item) => {
  //     if (err) throw err;
  //     console.log("Result Array", item);
  //   })
  //   db.close();
  db.collection("tweets2").find().toArray((err, results) => {
    if (err) throw err;

    console.log("results array: ", results);

    // This is the end...
    db.close();
  });
});
