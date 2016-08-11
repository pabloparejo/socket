var Q = require("Q")
var mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
var connection = Q.defer()

var models = {
    User: User(),
    Message: Message(),
    Conversation: Conversation()
}

module.exports = {
    connection: connection.promise,
    models: models
}


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(error){
    console.error.bind(console, 'connection error:')
    connection.reject(new Error(error))
});
db.once('open', function() {
    connection.resolve(models)
});

function Model(name, schema, plugins) {
    var Schema = mongoose.Schema(schema)
    if (plugins !== undefined) {
        for (var i = 0; i < plugins.length; i++) {
            Schema.plugin(plugins[i])
        }
    }
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
    var plugins = [uniqueValidator]
    return Model("User", {
        fullname: String,
        username: {type: String, required: true, unique: true},
        password: String,
        createdOn: {type: Date, default: Date.now}
    }, plugins)
}


function Conversation(){
    return Model("Conversation", {
        name: String,
        users: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
        isGroup: Boolean,
        createdOn: {type: Date, default: Date.now}
    })
}


