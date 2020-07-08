module.exports = {
	run: function(room) {
		// Creep spawn for core room
		for (var type in room.memory.creeps_limit) {
			var limit = parseInt(room.memory.creeps_limit[type])
			if ((!room.memory.creeps_type.hasOwnProperty(type) && room.memory.creeps_limit[type] > 0) ||
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

				var name = room.name + '_' + type + '_' + room.memory.creep_num
				if (name in Game.creeps) {
					room.memory.creep_num++
					name = room.name + '_' + type + '_' + room.memory.creep_num
				}
				var opts = {'memory': {'type': type, 'room': room.name}}
				var spawn = this.getIdleSpawn(room)
				if (spawn != null) {
					if (spawn.memory.spawn == null) {
						spawn.memory.spawn = {'body': body, 'name': name, 'opts': opts}
					}
				}
				break
			}
		}

		// Creep spawn request from other rooms
		var spawn = this.getIdleSpawn(room)
		if (spawn != null) {
			if (room.memory.spawn_request != null && spawn.memory.spawn == null) {
				spawn.memory.spawn = room.memory.spawn_request
			}
		}
		room.memory.spawn_request = null
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
