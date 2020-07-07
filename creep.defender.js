module.exports = {
  bodies: [[TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE]]
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
      //creep.move(require('lodash').sample([1, 2, 3, 4, 5, 6, 7, 8]))
      creep.moveTo(new RoomPosition(20, 35, creep.room.name))
    }
  }
}
