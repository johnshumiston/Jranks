'use strict';
var path = require('path');
var express = require('express');
var app = express();

module.exports = function (db) {

    var User = db.model('user');
    // Pass our express application pipeline into the configuration
    // function located at server/app/configure/index.js


    require('./configure')(app, db);

    app.use('/', function(req, res, next) {
        if (req.user) {
            // console.log('PREVIOUS SESSION', req.session);
            User.findById(req.session.passport.user)
            .then(function(user){
                if (!Object.keys(req.session.cart).length){
                    for (var key in user.cart){
                        req.session.cart[key] = user.cart[key];
                    }
                    // req.session.cart = user.cart;
                    // console.log('NO THERE WAS NO CART', req.session.cart);
                }
                else {
                    user.update({cart: req.session.cart});
                    // console.log('YES THERE WAS A CART', req.session.cart);
                }
            })
        }
        next();
    })

    app.use('/admin', function(req, res, next) {
        if (!req.user) {
            res.sendStatus(403);
        } else if (!req.user.is_admin){
            delete req.user.is_admin
            res.sendStatus(403)
        }
        else res.sendFile(app.get('adminHTMLPath'));
    })

    app.use('/checkout', require('./routes/checkout.js'));

    // Routes that will be accessed via AJAX should be prepended with
    // /api so they are isolated from our GET /* wildcard.
    app.use('/api', require('./routes'));


    /*
     This middleware will catch any URLs resembling a file extension
     for example: .js, .html, .css
     This allows for proper 404s instead of the wildcard '/*' catching
     URLs that bypass express.static because the given file does not exist.
     */
    app.use(function (req, res, next) {

        if (path.extname(req.path).length > 0) {
            res.status(404).end();
        } else {
            next(null);
        }

    });

    app.get('/*', function (req, res) {
        res.sendFile(app.get('indexHTMLPath'));
    });

    // Error catching endware.
    app.use(function (err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

    return app;

};

