
module.exports = function (RED) {
	function WCPConfigNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.name = config.name;
		node.apiToken = node.credentials.apikey;
	}

	RED.nodes.registerType("wcp-api-config", WCPConfigNode,{
		credentials: {
			apikey: {type: 'password'}
		}
	});
}