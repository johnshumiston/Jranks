'use strict';
var chalk = require('chalk');
var db = require('./db');
var fs = require('fs');
var https = require('https');
var app = require('./app');
var path = require('path');

// Create a node server instance! cOoL!
// var server = require('http').createServer();

var httpsServer = https.createServer({
  cert: fs.readFileSync(path.join(__dirname + '/cert.pem')),
  key: fs.readFileSync(path.join(__dirname + '/key.pem'))
}, app(db));

var httpServer = require('http').createServer();

var createApplication = function () {
    var app = require('./app')(db);
    //for http server
    httpServer.on('request', app); // Attach the Express application.
    require('./io')(httpServer);   // Attach socket.io.

    //for https server
    httpsServer.on('request', app); // Attach the Express application.
    require('./io')(httpsServer);   // Attach socket.io.
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    //for http server
    httpServer.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

    //for https server
    httpsServer.listen(8080, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(8080)));
    });    

};

db.sync().then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
