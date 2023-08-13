const http = require('node:http');

const {httpWithCompleteResponse} = require("./utils");


module.exports = {
    updateEmailForwardingRule: function (payload, apiKey) {
        return httpWithCompleteResponse(
            'POST',
            `/v1/data/email-forwarding/update`,
            apiKey,
            payload
        );
    },
    deleteEmailForwardingRule: function (payload, apiKey) {
        return httpWithCompleteResponse(
            'POST',
            `/v1/data/email-forwarding/delete`,
            apiKey,
            payload
        );
    },
}
