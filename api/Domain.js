
const {httpWithCompleteResponse} = require("./utils");


module.exports = {
    getDomain: function (payload, apiKey) {
        return httpWithCompleteResponse('GET', `/v1/data/domain`, apiKey, payload);
    }
}
