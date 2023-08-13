const http = require('node:http');

const {apiHost, apiPort} = require("./env");


module.exports = {
    httpWithCompleteResponse: function (method, path, apiKey, params = null) {
        const options = {
            method: method,
            path: path,
            hostname: apiHost,
            port: apiPort,
            agent: false,  // Create a new agent just for this one request
            headers: {
                'x-api-key': apiKey,
                'Cookie': 'XDEBUG_SESSION=PHPSTORM;',
            },
        };
        if (method === 'GET' && params) {
            options.path += `?${new URLSearchParams(params).toString()}`;
        } else if (method === 'POST') {
            options.headers['Content-Type'] = 'application/json';
        }
        console.log('options', options);

        return new Promise((resolve, reject) => {
            const req = http.request(options, (response) => {
                let responseData = '';
                response.on('data', (chunk) => {
                    responseData += chunk;
                });

                response.on('end', () => {
                    try {
                        const jsonResponse = JSON.parse(responseData);
                        const responseResult = {
                            status: response.statusCode,
                            data: jsonResponse,
                        };
                        resolve(responseResult);
                    } catch (error) {
                        reject(error);
                    }
                });

                response.on('error', (error) => {
                    reject(error);
                });
            });

            // Send payload data in the request body for POST requests
            if (method === 'POST' && params) {
                req.write(JSON.stringify(params));
            }

            req.end();
        });
    }
}
