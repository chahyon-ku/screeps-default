module.exports = {
  run: function(tower) {
    this.init(tower)

    if (tower.energy / tower.energyCapacity < 0.5) {
      tower.room.memory.structures[tower.id].transfer = true
      //tower.memory.transfer = true
    } else if (tower.energy / tower.energyCapacity > 0.75) {
      tower.room.memory.structures[tower.id].transfer = false
    }

    var target = tower.pos.findClosestByRange(FIND_CREEPS, {
      filter: function(c) {
        return !c.my
      }
    })
    if (target) {
      tower.attack(target)
    }
  }
  ,
  init: function(tower) {
    if (tower.room.memory.structures[tower.id] == null) {
      tower.room.memory.structures[tower.id] = {}
    }
  }
}
