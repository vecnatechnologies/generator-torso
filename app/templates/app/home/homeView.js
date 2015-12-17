var Torso = require('torso');

module.exports = new (Torso.View.extend({
  template: require('./home-template.hbs')
}))();
