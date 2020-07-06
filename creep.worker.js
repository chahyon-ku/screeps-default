module.exports = {
	body: [WORK, CARRY, MOVE, MOVE]
	,
	run : function(creep) {
		if (creep.memory.work == null) {
			creep.memory.work = 0;
		}
		// Harvest
		else if (creep.memory.work == 0) {
			if (creep.memory.source == null) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if (source) {
					creep.memory.source = source.id;
				}
			} else {
				var source = Game.getObjectById(creep.memory.source);
				var error = creep.harvest(source);
				if (error == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				}
			}

			if (creep.carryCapacity == creep.carry[RESOURCE_ENERGY]) {
				creep.memory.work = 1;
			}
		}
		// Transfer
		else if (creep.memory.work == 1) {
			if (creep.memory.target == null) {
				var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
						{filter: function(s) {
							return (s.structureType == STRUCTURE_SPAWN
									|| s.structureType == STRUCTURE_EXTENSION)
									&& s.energy < s.energyCapacity;
						}});
				if (target) {
					creep.memory.target = target.id;
				}
			} else {
				var target = Game.getObjectById(creep.memory.target);
				var error = creep.transfer(target, RESOURCE_ENERGY);
				if (error == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				} else if (error == ERR_NOT_ENOUGH_RESOURCES) {
					creep.memory.work = 0;
				} else {
					creep.memory.target = null;
				}
			}
		}
	}
}
