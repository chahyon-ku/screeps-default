var room = require('room');
var spawn = require('spawn');
var creep = require('creep');

module.exports.loop = function() {
	for (var roomName in Game.rooms) {
		room.run(Game.rooms[roomName]);
	}

	for (var spawnName in Game.spawns) {
		spawn.run(Game.spawns[spawnName]);
	}

	for (var creepName in Game.creeps) {
		creep.run(Game.creeps[creepName]);
	}
}
