var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});



const { MongoClient } = require('mongodb');
const uri = 'mongodb://Admin:JudgeApiAdmin@ac-pa0zskg-shard-00-00.bzuykhf.mongodb.net:27017,ac-pa0zskg-shard-00-01.bzuykhf.mongodb.net:27017,ac-pa0zskg-shard-00-02.bzuykhf.mongodb.net:27017/?ssl=true&replicaSet=atlas-5ht9qk-shard-0&authSource=admin&retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.log('Error connecting to MongoDB Atlas', error);
    }
}
  

app.get('/CF', async (req, res) => {
    const collection = client.db('test').collection('Problems');
    const result = await collection.find({OJ: 'Codeforces'}, {projection: { _id: 0 }}).toArray();
    res.send(result);
  });

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
    connectToDatabase();
});