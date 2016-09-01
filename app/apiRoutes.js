const apiControllers = require("./apicontrollers")
const config = require("./config")
const jwt    = require('jsonwebtoken');

module.exports = function (router, db) {
    var models = db.models

    router.post('/authenticate', function(req, res) {

        // find the user
        models.User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    var token = jwt.sign(user, config.secret, {
                        expiresIn: "7 days"
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }   
            }
        });
    });

    var routers = {
        "/users": models.User,
        "/messages": models.Message,
        "/conversations": models.Conversation
    }

    router.use(function(req, res, next) {
        console.error("asuca")
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;    
                    next();
                }
            });

        } else {
            return res.status(403).send({ 
                success: false,
                message: 'No token provided.'
            });
        }
    });

    for (var url in routers){
        apiControllers.Router(url, routers[url], router)
    }

    return router
}

