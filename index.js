const mongo = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';

//Promises realisation of connection and getting data from mongoDB
// const connection = mongo.connect(url,
//                                 {useNewUrlParser: true}
//                                 ).then(onConnect
//                                 ).then(onFound
//                                 ).then(onArrayConverted
//                                 ).catch(err); 

// function onConnect(client) {
//     const db = client.db('check');
//     const col = db.collection('users');

//     return col.find();
// }

// function onFound(cursor) {
//     return cursor.toArray();    
// }

// function onArrayConverted(data) {
//     console.log(data);    
// }

// function err(err) {
//     console.log('ERROR: ', err);    
// }

//-------------------------------------------------------------------------------
//Experiments with creating class object that can select database and collection

// class DB {
//     constructor(dbName,colName,client) {
//         this.dbName = dbName;
//         this.colName = colName;
//         this.client = client;
//     }
//     connectToDB() {
//         return this.client.db(this.dbName);
//     }
//     selectDBCollection() {
//         return this.connectToDB().collection(this.colName);
//     }
// }
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
//Functions that are needed for realising of connection, 
//creating new data and showing this data (mongoDB)
//using CALLBACKS
const connection = mongo.connect(url, 
                                {useNewUrlParser: true},
                                onConnect);

function onConnect(err, client) {
    //-------------------------------------------------------------------------------
    //Creating the new object of the class - DB
    // const dbTemplate = new DB('check', 'users', client);

    //Creating collection object using functions that created in the class DB object
    // const collection = dbTemplate.selectDBCollection();
    //-------------------------------------------------------------------------------

    const db = client.db('check');
    const collection = db.collection('users');

    collection.insertMany([
        {name: 'Sergey', age: 1, xxx: ['a', 'b']},
        {name: 'Andrey', age: 10, xxx: []},
        {name: 'Lena', age: 20, xxx: ['b']},
        {name: 'Gena', age: 20, xxx: ['a', 'c']},
    ], onInsert); 
    collection.find(onFound);
}

function onFound(err, cursor) {
    console.log(cursor.toArray(onArrayConverted));    
}

function onArrayConverted(err, data) {
    console.log(data);    
}

function onInsert(err, result) {
    console.log(err);        
}
//-------------------------------------------------------------------------------
