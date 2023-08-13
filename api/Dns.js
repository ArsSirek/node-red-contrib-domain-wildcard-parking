
const {httpWithCompleteResponse} = require("./utils");


module.exports = {
    getDns: function (payload, apiKey) {
        return httpWithCompleteResponse('GET', `/v1/data/dns`, apiKey, payload);
    },
    updateDns: function (payload, apiKey) {
        return httpWithCompleteResponse('POST', `/v1/data/dns/update`, apiKey,  payload);
    },
    deleteDns: function (payload, apiKey) {
        return httpWithCompleteResponse('POST', `/v1/data/dns/delete`, apiKey,  payload);
    },
}
