module.exports = {
  bodies: [[WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
           [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]]
  ,
  run: function(creep) {
		if (creep.memory.work == null) {
			creep.memory.work = 0;
		}
		// Withdraw
		if (creep.memory.work == 0) {
			var source = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES,
				{filter: function(s) {
					return s.structureType == STRUCTURE_CONTAINER
				}}
			);
			if (source) {
				var error = creep.withdraw(source, RESOURCE_ENERGY);
				if (error == ERR_NOT_IN_RANGE) {
					var move_error = creep.moveTo(source);
				}
			}

			if (creep.carryCapacity == creep.carry[RESOURCE_ENERGY]) {
				creep.memory.work = 1;
			} else {
				creep.memory.target = null
			}
		}
		// Upgrade
		if (creep.memory.work == 1) {
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
