const http = require('node:http');

const {updateEmailForwardingRule, deleteEmailForwardingRule} = require("./api/EmailForwarding");
const {getDomain} = require("./api/Domain");

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
			switch (msg[config.action]) {
				case 'getDomain':
					action = getDomain;
					break;
				case 'updateEmailForwardingRule':
					action = updateEmailForwardingRule;
					break;
				case 'deleteEmailForwardingRule':
					action = deleteEmailForwardingRule;
					break;
			}

			action(msg[config.payload], node.apiConfig.apiToken)
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
