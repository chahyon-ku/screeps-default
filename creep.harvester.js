module.exports = {
  bodies: [[WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
           [WORK, WORK, WORK, WORK, WORK, MOVE]]
  ,
  run: function(creep) {
    this.init(creep)

    if (creep.memory.source) {
      var source = Game.getObjectById(creep.memory.source)
      var container = source.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(s) {
          return s.structureType == STRUCTURE_CONTAINER
              && s.pos.lookFor(LOOK_CREEPS).length == 0
              && s.pos.inRangeTo(source.pos, 1)
        }
      })
      if (container != null && container.pos != creep.pos) {
        creep.moveTo(container)
      } else if (source != null) {
				var error = creep.harvest(source);
				if (error == ERR_NOT_IN_RANGE) {
					var move_error = creep.moveTo(source);
					if (move_error == ERR_NO_PATH) {
						creep.memory.source = null
					}
				}
      }
    }
  }
  ,
  init: function(creep) {
    if (creep.memory.init == 0 && creep.id != null) {
      creep.memory.init = 1
      var max_length = 999999
      for (var source_id in creep.room.memory.sources_creeps) {
        console.log(source_id)
        if (max_length > creep.room.memory.sources_creeps[source_id].length) {
          max_length = creep.room.memory.sources_creeps[source_id].length
          creep.memory.source = source_id
        }
      }
      creep.room.memory.sources_creeps[creep.memory.source].push(creep.id)
    }
  }
}
