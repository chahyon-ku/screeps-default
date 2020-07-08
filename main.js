var room = require('room');
var structure = require('structure')
var creep = require('creep');

module.exports.loop = function() {
	for (var roomName in Game.rooms) {
		room.run(Game.rooms[roomName]);
	}

	for (var structure_id in Game.structures) {
		structure.run(Game.structures[structure_id])
	}

	for (var creepName in Game.creeps) {
		creep.run(Game.creeps[creepName]);
	}
}
