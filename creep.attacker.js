module.exports = {
  bodies: [[TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
            MOVE,  MOVE,  MOVE,  MOVE,  MOVE,  MOVE,   ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],
           [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK],
           [TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK]]
  ,
  run: function(creep) {
    creep.memory.room = 'E13S46'

    if (creep.room.controller.safeMode > 0) {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room))
      return
    }

    // hostile creeps close by
    var target = creep.pos.findClosestByPath(FIND_CREEPS, {
      filter: function(c) {
        return !c.my && c.owner != null && c.pos.inRangeTo(creep.pos, 5) && ATTACK in c.body
      }
    })
    if (target) {
      var error = creep.attack(target)
      if (error == ERR_NOT_IN_RANGE) {
        creep.moveTo(target)
      }
      return
    }
    // creeps close by
    target = creep.pos.findClosestByPath(FIND_CREEPS, {
      filter: function(c) {
        return !c.my && c.owner != null && c.pos.inRangeTo(creep.pos, 5)
      }
    })
    if (target) {
      var error = creep.attack(target)
      if (error == ERR_NOT_IN_RANGE) {
        creep.moveTo(target)
      }
      return
    }
    // buildings
    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: function(c) {
        return !c.my && c.owner != null && c.structureType != STRUCTURE_CONTROLLER
      }
    })
    if (target) {
      var error = creep.attack(target)
      if (error == ERR_NOT_IN_RANGE) {
        creep.moveTo(target)
      }
      return
    }

    target = creep.pos.findClosestByPath(FIND_CREEPS, {
      filter: function(c) {
        return !c.my && c.owner != null
      }
    })
    if (target) {
      var error = creep.attack(target)
      if (error == ERR_NOT_IN_RANGE) {
        creep.moveTo(target)
      }
    } else {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room))
    }
  }
}
