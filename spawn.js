var spawn = {
	run : function(spawn) {
		if (spawn.memory.creepNum == null) {
			spawn.memory.creepNum = 0;
		} else {
			if (spawn.memory.spawnCreeps != null) {
				var body = spawn.memory.spawnCreeps[0];
				if (!spawn.spawnCreep(body, spawn.name + '-' + spawn.memory.creepNum)) {
					spawn.memory.creepNum++;
					spawn.memory.spawnCreeps.shift();
				}
			}
		}
	}
}
module.exports = spawn;
