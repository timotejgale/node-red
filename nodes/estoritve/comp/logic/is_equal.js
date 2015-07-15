module.exports = function(RED) {
	function isEqualNode(config) {
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
			
			var measurements = JSON.parse(msg.payload);
			var retMeasurements = [];

			for(var i in measurements) {
				if(parseFloat(measurements[i].value) == parseFloat(node.compValue))
					retMeasurements.push(measurements[i]);
			}

			if(!retMeasurements.length > 0) {
				return;
			}
			
			msg.payload = retMeasurements;
			node.send(msg);
		});
	}
	RED.nodes.registerType("jeEnako", isEqualNode);
}
