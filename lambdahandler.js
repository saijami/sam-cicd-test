'use strict';

const getPages = require('./utils/utilities.js');

module.exports.gatewaylambda = (event, context, callback) => {
    const res = getPages.getV3PageResponse(event).then(function (result) {
        console.log(result);
        const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            },
            body: result
        };
        callback(null, response);
    }, function (err) {
        console.log(err);
    });
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};