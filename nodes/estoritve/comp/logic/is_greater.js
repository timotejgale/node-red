module.exports = function(RED) {
	function isGreaterNode(config) {
		RED.nodes.createNode(this, config);
		this.compValue = config.compValue;
		var node = this;
		
		this.on('input', function(msg) {
			if(!node.compValue) {
				node.warn("Ni vhodnega podatka!", msg);
				return;
			}
			if(isNaN(node.compValue)) {
				node.warn("Vhodni podatek ni število!", msg);
				return;
			}
			var value = msg.value || msg.payload.value;
			if(parseFloat(value) > parseFloat(node.compValue))
				msg.state = true;
			else
				msg.state = false;
			
			msg.value = value;
			node.send(msg);
		});
	}
	RED.nodes.registerType("jeVecje", isGreaterNode);
}
