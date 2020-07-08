module.exports = {
  run: function(room) {
    room.memory.creeps_limit = {'miner': 2, 'hauler': 4, 'claimer': 1, 'defender': 0}

    for (var type in room.memory.creeps_limit) {
      var limit = parseInt(room.memory.creeps_limit[type])
      var parent = Game.rooms[room.memory.parent]
			if ((!room.memory.creeps_type.hasOwnProperty(type) && limit > 0) ||
					room.memory.creeps_type[type].length < limit) {
				var bodies = require('creep.' + type).bodies
				var body = []
				for (var i in bodies) {
					var cost = 0
					for (var j in bodies[i]) {
						cost += BODYPART_COST[bodies[i][j]]
					}
					if (cost <= parent.energyCapacityAvailable) {
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
				if (parent.memory.spawn_request == null) {
					parent.memory.spawn_request = {'body': body, 'name': name, 'opts': opts}
				}
				return
			}
    }
  }
}
