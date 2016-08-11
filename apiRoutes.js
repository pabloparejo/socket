
module.exports = function (app, router, db) {
    var models = db.models

    router.route("/asuca").get(function (req, res) {
        res.json({ message: 'Bear created!' });
    })

    router.route("/users")
        .get(defaultGet(models.User))
    router.route("/messages")
        .get(defaultGet(models.Message))
    router.route("/conversations")
        .get(defaultGet(models.Conversation))

    app.use("/api", router)

}

function defaultGet(model){
    return function(req, res) {
        model.find(function (err, results) {
            console.log(req.query)
            res.json(results)
        })
    }
}
