var generators = require('yeoman-generator');
var _ = require('underscore');
var util = require('../util');

module.exports = generators.NamedBase.extend({

  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'singleton',
      message: 'Is the view a singleton?',
      default: false
    }, function(answers) {
      this.singleton = answers.singleton;
      done();
    }.bind(this));
  },

  writing: function() {
    var templateName = this.name + '-template.hbs',
        viewName = (this.singleton ? this.name : capitalizeFirstLetter(this.name)) + 'View.js',
        sassName = '_' + this.name + '.scss';
    console.log('building view');
    this.fs.copyTpl(
        this.templatePath('view.js'),
        this.destinationPath(this.name + '/' + viewName),
        {
          template: templateName,
          singleton: this.singleton
        }
    );
    console.log('building template');
    this.fs.copyTpl(
        this.templatePath('template.hbs'),
        this.destinationPath(this.name + '/' + templateName),
        {}
    );
    console.log('building sass file');
    this.fs.copyTpl(
        this.templatePath('_styles.scss'),
        this.destinationPath(this.name + '/' + sassName),
        {}
    );
    this.log('\nCreated new pod.');
  },

  writeToAppScss: function() {
    try {
      var appPath = this.env.options.appPath || '.';
      var fullPath = appPath + '/app.scss';

      util.rewriteFile({
        file: fullPath,
        addLineAtEnd: true,
        splicable: [
          "@import '" + this.name + '/' + this.name + "';"
        ]
      });
      this.log('\nAdded _' + this.name + '.scss reference to ' + fullPath + '\n');
    } catch (e) {
      this.log('\nUnable to find ' + fullPath + '. Reference to _' + this.name + '.scss ' + 'not added.\n');
    }
  }
});

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}
