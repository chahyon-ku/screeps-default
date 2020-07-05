var room = {
	run: function(room) {
		if (room.memory.sources == null) {
			room.memory.sources = [];

			var sources = room.find(FIND_SOURCES);
			for (var source of sources) {
				room.memory.sources.push(source.id);
			}
		}

		if (room.memory.spawns == null) {
			room.memory.spawns = [];
		} else if (room.memory.spawns.length > 0) {
			var spawn = Game.getObjectById(room.memory.spawns[0]);

		}

		// Creep Count
		if (spawn.room.memory.creeps = null) {
			spawn.room.memory.creeps = []
		}

		// Creep Spawn
		if (spawn.room.memory.creep_spawns = null) {
			spawn.room.memory.creep_spawns = [{'type': 'worker', 'number': '4'}]
		} else {
			for (var creep_spawn in spawn.room.memory.creep_spawns) {

			}
		}
	}
}
module.exports = room;
