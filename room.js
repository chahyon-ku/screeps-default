module.exports = {
	run: function(room) {
		this.init(room)

		this.update(room)

		// Creep Spawn
		for (var i in room.memory.creeps_limit) {
			var creep_limit = room.memory.creeps_limit[i]
			if (!room.memory.creeps_type.hasOwnProperty(creep_limit.type) ||
					room.memory.creeps_type[creep_limit.type] < creep_limit.limit) {
				var body = [WORK, CARRY, MOVE, MOVE]
				var name = room.name + '.' + room.memory.creep_num
				var opts = {'memory': {'type': creep_limit.type}}
				var spawn = this.getIdleSpawn(room)
				if (spawn != null) {
					if (spawn.memory.spawn == null) {
						spawn.memory.spawn = {'body': body, 'name': name, 'opts': opts}
					}
				}
			}
		}
	}
	,
	init: function(room) {
		if (room.memory.init == null) {
			room.memory = null
			room.memory.init = 0

			// Source list
			room.memory.sources = [];
			var sources = room.find(FIND_SOURCES);
			for (var source of sources) {
				room.memory.sources.push(source.id);
			}

			// Creep list
			room.memory.creeps = []

			// Creep type list
			room.memory.creeps_type = {}

			// Spawn list
			room.memory.spawns = [];

			// Creep limit list
			room.memory.creeps_limit = [{'type': 'worker', 'limit': '4'}]

			// Creep num
			room.memory.creep_num = 0
		}
	}
	,
	update: function(room) {
		// Creep list
		for (var i = 0; i < room.memory.creeps.length;) {
			// Creep does not exist
			if (Game.getObjectById(room.memory.creeps[i]) == null) {
				room.memory.creeps.splice(i, 1)
			} else {
				i++
			}
		}
		// Creep type list
		for (var type in room.memory.creeps_type) {
			for (var i = 0; i < room.memory.creeps_type[type].length;) {
				if (Game.getObjectById(room.memory.creeps_type[type][i] == null)) {
					room.memory.creeps_type[type].splice(i, 1)
				} else {
					i++
				}
			}
		}
		// Spawn list
		for (var i = 0; i < room.memory.spawns.length;) {
			if (Game.getObjectById(room.memory.spawns[i]) == null) {
				room.memory.spawns.splice(i, 1)
			} else {
				i++
			}
		}
	}
	,
	getIdleSpawn: function(room) {
		if (room.memory.spawns.length > 0) {
			for (var i in room.memory.spawns) {
				var spawn_id = room.memory.spawns[i]
				return Game.getObjectById(spawn_id)
			}
		} else {
			return null;
		}
	}
}
