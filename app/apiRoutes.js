const apiControllers = require("./apicontrollers")

module.exports = function (app, router, db) {
    var models = db.models

    var routers = {
        "/users": models.User,
        "/messages": models.Message,
        "/conversations": models.Conversation
    }

    for (var url in routers){
        apiControllers.Router(url, routers[url], router)
    }

    app.use("/api", router)

}

