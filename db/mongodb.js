const mongoClient = require('mongodb').MongoClient;
let localDBUrl = 'mongodb://localhost:27017';

mongoClient.connect(localDBUrl, { useNewUrlParser: true }, function(error, client) {
    if (error) throw error;
    const database = client.db('mysite'); // 选择db
    const collection = database.collection('test'); // 选择表
    collection.find().toArray(function(error, res) {
        if (error) throw error;
        console.log(res);
    })
})
// mongodb建立连接池。是否需要需要关闭？