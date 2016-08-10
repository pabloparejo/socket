var Q = require("Q")
var mongoose = require("mongoose")
var connection = Q.defer()

module.exports = {
    connection: connection.promise
}

var models = {}

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(error){
    console.error.bind(console, 'connection error:')
    connection.reject(new Error(error))
});
db.once('open', function() {
    var MessageSchema = mongoose.Schema({
        user: String,
        message: String,
        datetime: Date
    })

    models.Message = mongoose.model("Message", MessageSchema)

    connection.resolve(models)
});


