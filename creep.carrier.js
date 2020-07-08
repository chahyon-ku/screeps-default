module.exports = {
  bodies: [[CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]]
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
              && s.store[RESOURCE_ENERGY] > 500
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
        creep.memory.target = null
			}
		}

    if (creep.memory.work == 1) {
      if (creep.memory.target == null) {
  			var target = creep.pos.findClosestByRange(FIND_STRUCTURES,
  				{filter: function(s) {
  					return (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity
  				}}
  			);
  			if (target) {
          creep.memory.target = target.id
  			} else {
          target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
          {filter: function(s) {
            return s.structureType == STRUCTURE_STORAGE
          }})
          if (target) {
            creep.memory.target = target.id
          }
        }
      } else {
        var target = Game.getObjectById(creep.memory.target)
  			if (target) {
  				var error = creep.transfer(target, RESOURCE_ENERGY);
  				if (error == ERR_NOT_IN_RANGE) {
  					var move_error = creep.moveTo(target);
  				} else if (error == ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.work = 0
          } else if (error != OK) {
            creep.memory.target = null
          }
  			}
      }
    }
  }
}
