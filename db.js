var Q = require("Q")
var mongoose = require("mongoose")
var connection = Q.defer()

module.exports = {
    connection: connection.promise
}

var models;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(error){
    console.error.bind(console, 'connection error:')
    connection.reject(new Error(error))
});
db.once('open', function() {

    models = {
        Message: Message()
    }

    connection.resolve(models)
});

function Model(name, schema) {
    var Schema = mongoose.Schema(schema)
    return mongoose.model(name, Schema)
}

function Message(){
    return Model("Message", {
        user: String,
        message: String,
        datetime: Date
    })
}


