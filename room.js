module.exports = {
	run: function(room) {
		this.init(room)

		this.update(room)

		// Creep Spawn
		for (var type in room.memory.creeps_limit) {
			var limit = parseInt(room.memory.creeps_limit[type])
			if (!room.memory.creeps_type.hasOwnProperty(type) ||
					room.memory.creeps_type[type].length < limit) {
				var bodies = require('creep.' + type).bodies
				var body = []
				for (var i in bodies) {
					var cost = 0
					for (var j in bodies[i]) {
						cost += BODYPART_COST[bodies[i][j]]
					}
					if (cost <= room.energyCapacityAvailable) {
						body = bodies[i]
						break;
					}
				}

				var name = room.name + '_' + room.memory.creep_num
				if (name in Game.creeps) {
					room.memory.creep_num++
					room.name + '_' + room.memory.creep_num
				}
				var opts = {'memory': {'type': type}}
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
			room.memory.creeps_limit = {'worker': '8'}

			// Creep num
			room.memory.creep_num = 0
		}
		if (room.memory.init < room.controller.level) {
			if (room.controller.level == 1) {
				room.memory.creep_limit = {'worker': '12'}
			}
			if (room.controller.level == 3) {
				room.memory.init = room.controller.level
				room.memory.creeps_limit = {'worker': '8'}
			}
		}
	}
	,
	update: function(room) {
		// Creep list
		for (var i = 0; i < room.memory.creeps.length;) {
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
				var spawn = Game.getObjectById(spawn_id)
				if (spawn.spawning == null) {
					return spawn
				}
			}
		}
		return null
	}
}
