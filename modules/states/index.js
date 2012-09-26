var main = function (server) {

    var db = server.db.collection('states');

    var loadRoutes = function () {
        console.log('in the load routes');
        server.routeManager.addRoute("GET", "/states", function (req, res) {
            db.find(null, function (err, result) {
                if (err) {
                    throw (err);
                }
                res.simpleJson(200, result);

            });

        });
        server.routeManager.addRoute("GET", /\/states\/([\w]+)$/, function (req, res, matches) {

            var state = matches[1];
            db.find({state:state}, function (err, result) {
                if (err) {
                    throw (err);
                }
                res.simpleJson(200, result);

            });

        });
        server.routeManager.addRoute("POST", "/states", function (req, res, data) {

            //validate data for correct keys
            if (data.state) {
                //validate state does not already exist
                db.find({state:data.state}, function (err, result) {
                    if (err) {
                        throw (err);
                    }
                    console.log('result');
                    console.log(result);
                    if (result) {
                        res.simpleJson(409, {result:'State name conflict'});
                    } else {
                        db.save({state:data.state});
                        res.simpleJson(200, {result:'OK'});
                    }

                });
            } else {
                res.simpleJson(422, {result:'improper form data'});
            }


        });

    };

    loadRoutes();
    return {};


};


/**
 * Exports
 */
module.exports = main;
