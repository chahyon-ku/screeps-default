module.exports = {
  bodies: [[CLAIM, CLAIM, MOVE, MOVE]]
  ,
  run: function(creep) {
    if (creep.room.name != creep.memory.room) {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room))
    } else {
      var error = creep.reserveController(creep.room.controller)
      if (error == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller)
      }
    }
  }
}
