var Torso = require('torso');

module.exports = <% if (obj.singleton) { %>new (<% } %>Torso.View.extend({
  template: require('./<%= obj.template %>')

})<% if (obj.singleton) { %>)()<% } %>;
