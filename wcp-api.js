const {updateEmailForwardingRule, deleteEmailForwardingRule} = require("./api/EmailForwarding");
const {getDomain} = require("./api/Domain");
const {getDns, updateDns, deleteDns} = require("./api/Dns");

module.exports = function(RED) {
	function wcpSend(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.apiConfig = RED.nodes.getNode(config.config);

		node.on('input', function (msg) {
			node.status({
				fill: "orange",
				shape: "dot",
				text: `Trying to send...`
			});

			let action = () => {};
			let payload = msg[config.payload];
			switch (msg[config.action]) {
				case 'getDomain':
					action = getDomain;
					break;
				case 'getDns':
					action = getDns;
					break;
				case 'updateDns':
					action = updateDns;
					break;
				case 'deleteDns':
					action = deleteDns;
					break;
				case 'updateEmailForwardingRule':
					action = updateEmailForwardingRule;
					break;
				case 'deleteEmailForwardingRule':
					action = deleteEmailForwardingRule;
					break;
			}

			if (typeof payload === 'string') {
				payload = {
					domain_name: payload,
				}
			}

			action(payload, node.apiConfig.apiToken)
				.then((res) => {

					console.log(
						'res', res
					)
					node.status({
						fill: "green",
						shape: "dot",
						text: `message sent`,
					});
					node.send({
						...msg,
						payload: res,
					})
				})
				.catch((error) => {
					console.log('error', error);
					node.send({
						...msg,
						error: error,
					})
				});
		});
	}
	RED.nodes.registerType("wcp-api", wcpSend);
}
