var types = {'worker': require('creep.worker')}

module.exports = {
	run : function(creep) {
		if (creep.my) {
			this.init(creep)

			if (creep.memory.init != null) {
				types[creep.memory.type].run(creep)
			}
		}
	}
	,
	init : function(creep) {
		if (creep.memory.init == null && creep.id != null) {
			creep.memory.init = 0
			console.log(creep.name + ' ' + creep.id)

			creep.room.memory.creeps.push(creep.id)
			if (!creep.room.memory.creeps_type.hasOwnProperty(creep.memory.type))
				creep.room.memory.creeps_type[creep.memory.type] = []
			creep.room.memory.creeps_type[creep.memory.type].push(creep.id)
		}
	}
}
