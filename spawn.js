module.exports = {
	run: function(spawn) {
		if (spawn.my) {
			this.init(spawn)

			if (spawn.memory.spawn != null) {
				spawn.spawnCreep(spawn.memory.spawn.body, spawn.memory.spawn.name, spawn.memory.spawn.opts)
			}
		}
	}
	,
	init: function(spawn) {
		if (spawn.memory.init == null) {
			spawn.memory = null
			spawn.memory.init = 0

			spawn.room.memory.spawns.push(spawn.id)
		}
	}
}
