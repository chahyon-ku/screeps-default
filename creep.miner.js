module.exports = {
  bodies: [[WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE]]
  ,
  run: function(creep) {
    this.init(creep)

    if (creep.memory.room != creep.room.name) {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room))
    } else {
      var source = Game.getObjectById(creep.memory.source)
      if (source) {
        var error = creep.harvest(source)
        if (error == ERR_NOT_IN_RANGE) {
          creep.moveTo(source)
        }
      }
    }
  }
  ,
  init: function(creep) {
    if (creep.memory.source == null && creep.room.name == creep.memory.room) {
      var max_length = 999999
      for (var source_id in creep.room.memory.sources_creeps) {
        if (max_length > creep.room.memory.sources_creeps[source_id].length) {
          max_length = creep.room.memory.sources_creeps[source_id].length
          creep.memory.source = source_id
        }
      }
      creep.room.memory.sources_creeps[creep.memory.source].push(creep.id)
    }
  }
}
