var HOST = null;
var PORT = 8001;
var SESSION_TIMEOUT = 60 * 1000;

var path = require('path'),
    fs = require('fs');

var server = require("./route").getServer();
var RouteManager = require("./RouteManager");

server.routeManager = new RouteManager(server);
server.db = require("./persist");
server.listen(Number(process.env.PORT || PORT), HOST);









loadModules();


server.routeManager.processRoute();



function loadModules() {
    var m;
    server.modules = {};
    fs.readdirSync(__dirname + '/../modules').forEach(function(module) {
        m = require(__dirname + '/../modules/' + module);
        server.modules[module] = m(server);
    });

}

