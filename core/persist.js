var databaseUrl = "localhost"; // "username:password@example.com/mydb"
var collections = ["states"]
var db = require("mongojs").connect(databaseUrl, collections);

module.exports = {

    collection:function (collection) {
        return {
            find:function (query, callback) {

                db[collection].find(query, function (err, results) {
                    callback(err, results);

                });

            },
            save:function (state) {
                db[collection].save(state, function (err) {

                    if (err) {
                        console.log(err);
                        throw(err);
                    }

                });
            }
        };
    }
};



