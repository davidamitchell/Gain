
var RouteManager = function(server) {

    return {
        routes: [],


        addRoute: function(method, path, routeFn) {

            var options = {};
            options.method = method;
            options.path = path;
            options.routeFn = routeFn;

            this.routes.push(options);


        },

        processRoute: function(){
            console.log(this.routes);

            this.routes.forEach(function(route){
                console.log(route);

                switch(route.method)
                {
                    case 'GET':
                        console.log('loading get');
                        server.get(route.path,route.routeFn);
                        break;
                    case 'POST':
                        console.log('loading post');
                        server.post(route.path,route.routeFn);
                        break;
                    default:
                        console.log('method %s not found', route.method);
                }
            });
        }



    };

};


/**
 * Exports
 */
module.exports = RouteManager;
