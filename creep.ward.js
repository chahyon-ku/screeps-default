module.exports = {
  bodies: [[MOVE]]
  ,
  run: function(creep) {
    creep.memory.dest_room = 'E12S49'
    creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_room))
  }
}
