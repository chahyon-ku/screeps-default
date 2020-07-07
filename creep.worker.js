module.exports = {
	bodies: [[WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
					 [WORK, CARRY, MOVE, MOVE]]
	,
	run : function(creep) {
		if (creep.memory.work == null) {
			creep.memory.work = 0;
		}
		// Withdraw
		if (creep.memory.work == 0) {
			var source = creep.pos.findClosestByPath(FIND_STRUCTURES,
				{filter: function(s) {
					return s.structureType == STRUCTURE_CONTAINER
							&& s.store[RESOURCE_ENERGY] > creep.store.getCapacity()
				}}
			);
			if (source) {
				var error = creep.withdraw(source, RESOURCE_ENERGY);
				if (error == ERR_NOT_IN_RANGE) {
					var move_error = creep.moveTo(source);
				}
			} else {
				creep.memory.work = -1
			}

			if (creep.carryCapacity == creep.carry[RESOURCE_ENERGY]) {
				creep.memory.work = 1;
			} else {
				creep.memory.target = null
			}
		}
		// Harvest
		if (creep.memory.work == -1) {
			if (creep.memory.source == null) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if (source) {
					creep.memory.source = source.id;
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
			} else {
				creep.memory.target = null
			}
		}
		// Transfer
		if (creep.memory.work == 1) {
			if (creep.memory.target == null) {
				var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES,
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
				var target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES,
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
		// Repair
		if (creep.memory.work == 3) {
			if (creep.memory.target == null) {
				var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
					{filter: function(s) {
						return s.hits < s.hitsMax * 0.9 && s.structureType == STRUCTURE_CONTAINER
					}}
				)
				if (target) {
					creep.memory.target = target.id
				} else {
					creep.memory.work = 4
					creep.memory.target = null;
				}
			} else {
				var target = Game.getObjectById(creep.memory.target)
				if (target.hits == target.hitsMax) {
					creep.memory.target = null
				}
				var error = creep.repair(target)
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
		if (creep.memory.work == 4) {
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
