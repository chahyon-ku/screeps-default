module.exports = {
  bodies: [
            [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE,  MOVE,  MOVE,  MOVE,  MOVE,  MOVE,  MOVE,  MOVE,  MOVE,  MOVE]
          ]
  ,
  run: function(creep) {
    if (creep.carry[RESOURCE_ENERGY] < creep.carryCapacity) {
      creep.memory.parent = null
      if (creep.room.name == creep.memory.room) {
        var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
          {filter: function(r) {
            return r.resourceType == RESOURCE_ENERGY && r.amount > 200
          }})
        if (target) {
          var error = creep.pickup(target)
          if (error == ERR_NOT_IN_RANGE) {
            creep.moveTo(target)
          }
        }
      } else {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.room))
      }
    } else if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
      if (creep.room.name == creep.memory.room) {
        creep.memory.parent = creep.room.memory.parent
        creep.moveTo(new RoomPosition(25, 25, creep.memory.parent))
      } else if (creep.room.name == creep.memory.parent) {
        var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: function(s) { return s.structureType == STRUCTURE_STORAGE }
        })
        if (target) {
          var error = creep.transfer(target, RESOURCE_ENERGY)
          if (error == ERR_NOT_IN_RANGE) {
            creep.moveTo(target)
          }
        }
      } else {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.parent))
      }
    }
  }
}
