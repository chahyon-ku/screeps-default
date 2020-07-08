var types = {'worker': require('creep.worker'),
						 'harvester': require('creep.harvester')}

module.exports = {
	run : function(creep) {
		if (creep.my) {
			this.init(creep)

			if (creep.memory.init != null) {
				require('creep.' + creep.memory.type).run(creep)
			}
		}
	}
	,
	init : function(creep) {
		if (creep.memory.init == null && creep.id != null) {
			creep.memory.init = 0
			console.log(creep.name + ' ' + creep.id)

			// Register creep for room's database
			var room = Game.rooms[creep.memory.room]
			room.memory.creeps.push(creep.id)
			if (!room.memory.creeps_type.hasOwnProperty(creep.memory.type))
				room.memory.creeps_type[creep.memory.type] = []
			room.memory.creeps_type[creep.memory.type].push(creep.id)
		}
	}
}
