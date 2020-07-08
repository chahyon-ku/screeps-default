module.exports = {
  bodies: [[TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK],
           [TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK]]
  ,
  run: function(creep) {
    var target = creep.pos.findClosestByPath(FIND_CREEPS,
    {filter: function(c) {
      return !c.my
    }})

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
