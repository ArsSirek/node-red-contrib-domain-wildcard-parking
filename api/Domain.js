const http = require('node:http');

const {httpWithCompleteResponse} = require("./utils");


module.exports = {
    getDomain: function (payload, apiKey) {
        console.log(
            'getDomain', payload
        )
        return httpWithCompleteResponse('GET', `/v1/data/domain`, apiKey, {domain_name: payload});
    }
}
