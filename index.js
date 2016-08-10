var app = require("express")()
var http = require("http").Server(app)
var io = require("socket.io")(http)
var db = require("./db.js")

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/html/index.html')
})

http.listen(3000, function(){
    console.log("listening *:3000")
})

db.connection.then(function (models) {
    console.log("DB connected")
    var Message = models.Message
    io.on("connection", function (socket) {
        socket.on('chat message', function(data){
            var msg = new Message({
                "user": data.user, 
                "message": data.message,
                "date": new Date()
            })
            msg.save(function (err, message) {
                if (err) return console.error(err)
                console.log(message)
            })
            io.emit('chat message', msg)
        });

        Message.find(function (err, results) {
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                socket.emit("chat message", results[i])
                
            }
        })
        

        socket.on("disconnect", function () {
            console.log("user disconnected :(")
        })
    })    
})


