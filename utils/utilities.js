

module.exports.getV3PageResponse = (event, context, callback) => {
    
    const http = require('https');

    const keepAliveAgent = new http.Agent({ keepAlive: true });
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job
        http.get({
            host: 'api.tvnow.de',
            path: '/v3/pages/nowtv/tvnow?fields=*,teaserSets.id,teaserSets.row,teaserSets.layout,teaserSets.automaticType',
            agent: keepAliveAgent
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                // Data received, let us parse it using JSON!
                var parsed = JSON.parse(body);
                // var response = {
                //   "statusCode": 200,
                //   "headers": {
                //       "my_header": "my_value"
                //   },
                //   "body": JSON.stringify(parsed),
                //   "isBase64Encoded": false
                // }
                resolve(JSON.stringify(parsed));
            });
        });
    })
}

module.exports.readRuleSetFile = (data) => {
    var AWS = require('aws-sdk');
    var s3 = new AWS.S3();
    var params = { Bucket: bucketName, Key: filename };
    s3.getObject(params, function (err, data) {
        if (!err) 
            onFileContent(filename, data.Body.toString());
        else
            console.log(err);
    });    
}