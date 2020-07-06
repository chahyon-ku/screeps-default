var worker = require('creep.worker')

module.exports = {
	run : function(creep) {
		if (creep.my) {
			this.init(creep)

			if (creep.memory.type != null) {
				require('creep.' + creep.memory.type).run(creep)
			}
		}
	}
	,
	init : function(creep) {
		if (creep.memory.init == null) {
			creep.memory.init = 0

			creep.room.memory.creeps.push(creep.id)
			creep.room.memory.creeps_type[creep.memory.type].push(creep.id)
		}
	}
}
