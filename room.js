module.exports = {
	run: function(room) {
		if (room.memory.type != null) {
			this.init(room)
			this.update(room)
			require('room.' + room.memory.type).run(room)
		}
	}
	,
	init: function(room) {
			if (room.memory.init == null) {
				room.memory.init = 0

				// Source list
				// Sources creeps object
				room.memory.sources = [];
				room.memory.sources_creeps = {}
				var sources = room.find(FIND_SOURCES);
				for (var source of sources) {
					room.memory.sources.push(source.id);
					room.memory.sources_creeps[source.id] = []
				}

				// Creep list
				room.memory.creeps = []

				// Creep type object
				room.memory.creeps_type = {}

				// Spawn list
				room.memory.spawns = [];

				// Creep limit list
				room.memory.creeps_limit = {}

				// Creep num
				room.memory.creep_num = 0

				// Structures
				room.memory.structures = {}
			}
	}
	,
	update: function(room) {
		// Creep list
		for (var i = 0; i < room.memory.creeps.length;) {
			var creep = Game.getObjectById(room.memory.creeps[i])
			if (is_dead(creep)) {
				room.memory.creeps.splice(i, 1)
			} else {
				i++
			}
		}
		// Creep type list
		for (var type in room.memory.creeps_type) {
			for (var i = 0; i < room.memory.creeps_type[type].length;) {
				var creep = Game.getObjectById(room.memory.creeps_type[type][i])
				if (is_dead(creep)) {
					room.memory.creeps_type[type].splice(i, 1)
				} else {
					i++
				}
			}
		}
		// Spawn list
		for (var i = 0; i < room.memory.spawns.length;) {
			var creep = Game.getObjectById(room.memory.spawns[i])
			if (is_dead(creep)) {
				room.memory.spawns.splice(i, 1)
			} else {
				i++
			}
		}
		// source harvester list
		for (var source in room.memory.sources_creeps) {
			for (var i = 0; i < room.memory.sources_creeps[source].length;) {
				var creep = Game.getObjectById(room.memory.sources_creeps[source][i])
				if (is_dead(creep)) {
					room.memory.sources_creeps[source].splice(i, 1)
				} else {
					i++
				}
			}
		}
		// structures
		for (var structure_id in room.memory.structures) {
			if (Game.getObjectById(structure_id) == null) {
				delete room.memory.structures[structure_id]
			}
		}
	}
}

function is_dead(creep) {
	return creep == null || creep.ticksToLive < 100
}
