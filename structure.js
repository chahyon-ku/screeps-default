var structures_module = {'spawn': require('structure.spawn'),
                         'tower': require('structure.tower')}

module.exports = {
  run: function(structure) {
    if (structure.structureType in structures_module) {
      structures_module[structure.structureType].run(structure)
    }
  }
}
