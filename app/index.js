const express = require("express")
const bodyParser= require('body-parser')
const app = express()

const morgan = require('morgan');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config'); // get our config file

const http = require("http").Server(app)
const io = require("socket.io")(http)

const db = require("./db.js")
const api = require("./apiRoutes")(app, express.Router(), db)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('static/public'));
app.set('secret', config.secret); // secret variable

app.get("/", function (req, res) {
    var route = __dirname.replace("app", "static/index.html")
    res.sendFile(route)
})

app.get('/setup', function(req, res) {
    var User = db.models.User
    // create a sample user
    var rand = Math.random()
    var nick = new User({ 
        username: rand, 
        password: 'password',
        fullname: "filemoncho" 
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});


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





