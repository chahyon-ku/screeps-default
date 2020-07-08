module.exports = {
	error_messages: {'0': 'The operation has been scheduled successfully.',
									 '-1': 'You are not the owner of this spawn.',
								 	 '-3': 'There is a creep with the same name already.',
								 	 '-4': 'The spawn is already in process of spawning another creep.',
								   '-6': 'The spawn and its extensions contain not enough energy to create a creep with the given body.',
									 '-10': 'Body is not properly described or name was not provided.',
									 '-14': 'Your Room Controller level is insufficient to use this spawn.'}
	,
	run: function(spawn) {
		if (spawn.my) {
			this.init(spawn)

			if (spawn.memory.spawn != null) {
				var error = spawn.spawnCreep(spawn.memory.spawn.body, spawn.memory.spawn.name, spawn.memory.spawn.opts)
				if (error == OK || error == ERR_NOT_OWNER || error == ERR_NAME_EXISTS ||
						error == ERR_INVALID_ARGS || error == ERR_RCL_NOT_ENOUGH) {
					console.log('[spawns.' + spawn.name + '.spawnCreep()] ' + this.error_messages[error])
					spawn.memory.spawn = null
				}
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
