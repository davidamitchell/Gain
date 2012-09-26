var databaseUrl = "test"; // "username:password@example.com/mydb"
//var db = require("mongojs").connect(databaseUrl);

var assert = require("assert");
var querystring = require('querystring');
var http = require('http');
var tests = {
    expected:1,
    executed:0,
    finished:function () { tests.executed++; }
};

testGetAllStates(function (response) {
    var data = '';

    assert.strictEqual(200, response.statusCode, 'Error in the status code expected: 200, got: %s', response.statusCode);
    assert.strictEqual("application/json", response.headers["content-type"], 'Error in content-type');

    response.on('data', function (chunk) {
        data += chunk;
    });
    response.on('end', function () {
        tests.finished();
    });

});

testBadFormData(function (response) {
    assert.strictEqual(422, response.statusCode, 'Error in the status code expected: 422, got: ' + response.statusCode);
    assert.strictEqual("application/json", response.headers["content-type"], 'Error in content-type');

});

testNormalFormData(function (response) {
    assert.strictEqual(200, response.statusCode, 'Error in the status code expected: 200, got: ' + response.statusCode);
    assert.strictEqual("application/json", response.headers["content-type"], 'Error in content-type');

});

process.on("exit", function () {
    console.log('before call back after request');
    assert.equal(tests.executed, tests.expected);
    console.log("\n\nAll done.  Everything passed.\n\n");
});


function testGetAllStates(callback) {

    var options = {
        host:'localhost',
        port:8001,
        path:'/states',
        method:'GET'
    };

    http.request(options,function (response) {
        callback(response);
    }).end();
}

function testBadFormData(callback) {
    var post_data = querystring.stringify({
        'bumdata':'a state name'
    });

    var options = {
        host:'localhost',
        port:8001,
        path:'/states',
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':post_data.length
        }
    };

    var request = http.request(options, function (response) {
        callback(response);
    });

    // the data to POST needs to be a string or a buffer
    request.write(post_data);
    request.end();
}

function testNormalFormData(callback) {
    var post_data = querystring.stringify({
        'state':'a state name'
    });

    var options = {
        host:'localhost',
        port:8001,
        path:'/states',
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Content-Length':post_data.length
        }
    };

    var request = http.request(options, function (response) {
        callback(response);
    });

    // the data to POST needs to be a string or a buffer
    request.write(post_data);
    request.end();
}