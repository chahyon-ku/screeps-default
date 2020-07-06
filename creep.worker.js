module.exports = {
	body: [WORK, CARRY, MOVE, MOVE]
	,
	bodies: [[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
					 [WORK, CARRY, MOVE, MOVE]]
	,
	run : function(creep) {
		if (creep.memory.work == null) {
			creep.memory.work = 0;
		}
		// Harvest
		if (creep.memory.work == 0) {
			if (creep.memory.source == null) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if (source) {
					creep.memory.source = source.id;
					//creep.room.memory.source_creeps[creep.memory.source].push(creep.id)
				}
			} else {
				var source = Game.getObjectById(creep.memory.source);
				var error = creep.harvest(source);
				if (error == ERR_NOT_IN_RANGE) {
					var move_error = creep.moveTo(source);
					if (move_error == ERR_NO_PATH) {
						creep.memory.source = null
					}
				}
			}

			if (creep.carryCapacity == creep.carry[RESOURCE_ENERGY]) {
				creep.memory.work = 1;
			}
		}
		// Transfer
		if (creep.memory.work == 1) {
			if (creep.memory.target == null) {
				var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
						{filter: function(s) {
							return (s.structureType == STRUCTURE_SPAWN
									|| s.structureType == STRUCTURE_EXTENSION)
									&& s.energy < s.energyCapacity;
						}});
				if (target) {
					creep.memory.target = target.id;
				} else {
					creep.memory.work = 2
					creep.memory.target = null
				}
			} else {
				var target = Game.getObjectById(creep.memory.target);
				var error = creep.transfer(target, RESOURCE_ENERGY);
				if (error == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				} else if (error == ERR_NOT_ENOUGH_RESOURCES) {
					creep.memory.work = 0;
				} else if (error != OK) {
					creep.memory.target = null;
				}
			}
		}
		// Build
		if (creep.memory.work == 2) {
			if (creep.memory.target == null) {
				var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES,
					{filter: function(c) {
						return c.my
					}}
				)
				if (target) {
					creep.memory.target = target.id
				} else {
					creep.memory.work = 3
					creep.memory.target = null;
				}
			} else {
				var target = Game.getObjectById(creep.memory.target)
				var error = creep.build(target)
				if (error == ERR_NOT_IN_RANGE) {
					creep.moveTo(target)
				} else if (error == ERR_NOT_ENOUGH_RESOURCES) {
					creep.memory.work = 0
				} else if (error != OK) {
					creep.memory.target = null
				}
			}
		}
		// Upgrade
		if (creep.memory.work == 3) {
			if (creep.memory.target == null) {
				var target = creep.room.controller
				if (target) {
					creep.memory.target = target.id
				}
			} else {
				var target = Game.getObjectById(creep.memory.target)
				var error = creep.upgradeController(target)
				if (error == ERR_NOT_IN_RANGE) {
					creep.moveTo(target)
				} else if (error == ERR_NOT_ENOUGH_RESOURCES) {
					creep.memory.work = 0
				} else if (error != OK) {
					creep.memory.target = null
				}
			}
		}
	}
}
