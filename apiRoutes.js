
module.exports = function (app, router, db) {
    var models = db.models

    router.route("/asuca").get(function (req, res) {
        res.json({ message: 'Bear created!' });
    })

    var UsersAPI = {
        get: defaultGet(models.User),
        post: defaultPost(models.User)
    }

    router.route("/users")
        .get(UsersAPI.get)
        .post(UsersAPI.post)
    


    router.route("/messages")
        .get(defaultGet(models.Message))
    router.route("/conversations")
        .get(defaultGet(models.Conversation))

    app.use("/api", router)

}

function defaultGet(model){
    return function(req, res) {
        model.find(req.query, function (err, results) {
            res.json(results)
        })
    }
}

function defaultPost(model) {
    return function(req, res) {
        var obj = new model(req.body)
        obj.save(function (err) {
            err ? res.status(400).json(err) : res.status(201).json(obj)
        })
    }
}