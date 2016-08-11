var Q = require("Q")
var mongoose = require("mongoose")
var connection = Q.defer()

module.exports = {
    connection: connection.promise,
    models: {
        User: User(),
        Message: Message(),
        Conversation: Conversation()
    }
}

var models;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(error){
    console.error.bind(console, 'connection error:')
    connection.reject(new Error(error))
});
db.once('open', function() {
    connection.resolve(models)
});

function Model(name, schema) {
    var Schema = mongoose.Schema(schema)
    return mongoose.model(name, Schema)
}

function Message(){
    return Model("Message", {
        user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
        message: String,
        createdOn: Date
    })
}

function User(){
    return Model("User", {
        fullname: String,
        username: String,
        password: String,
        createdOn: {type: Date, default: Date.now}
    })
}

function Conversation(){
    return Model("Conversation", {
        name: String,
        users: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
        isGroup: Boolean,
        createdOn: {type: Date, default: Date.now}
    })
}


