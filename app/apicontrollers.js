module.exports = {
    Router: Router,
    ListView: ListView,
    DetailView: DetailView,
    CreateView: CreateView,
    DeleteView: DeleteView
}

function Router(url, model, router) {
    this.detailUrl = url + "/:id"
    this.list = ListView(model)
    this.post = CreateView(model)
    this.detail = DetailView(model)
    this.destroy = DeleteView(model)

    router.route(url)
        .get(this.list)
        .post(this.post)

    router.route(this.detailUrl)
        .get(this.detail)
        .delete(this.destroy)
}

function ListView(model){
    return function(req, res) {
        model.find(req.query, function (err, results) {
            res.json(results)
        })
    }
}

function DetailView(model) {
    return function(req, res) {
        model.findById(req.params.id, function (err, obj) {
            err ? res.status(404).json(err) : res.json(obj)
        })
    } 
}

function CreateView(model) {
    return function(req, res) {
        var obj = new model(req.body)
        obj.save(function (err) {
            err ? res.status(400).json(err) : res.status(201).json(obj)
        })
    }
}

function DeleteView(model) {
    return function(req, res) {
        var id = req.params.id
        model.remove({_id: id}, function (err, removed) {
            if (err) {
                res.status(400).json(err)
            }else{
                var result = removed.result
                if (result.n == 0) {
                    res.status(404).json(result)
                }else{
                    res.status(200).json({_id: id})
                }
            }
        })
    } 
}