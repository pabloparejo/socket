const express = require("express")
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

const http = require("http").Server(app)
const io = require("socket.io")(http)

const db = require("./db.js")
const api = require("./apiRoutes.js")(app, express.Router(), db)

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/static/index.html')
})


http.listen(3000, function(){
    console.log("listening *:3000")
})

db.connection.then(function (models) {
    console.log("DB connected")
})

var Message = db.models.Message
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

    socket.on("disconnect", function () {
        console.log("user disconnected :(")
    })
}) 





