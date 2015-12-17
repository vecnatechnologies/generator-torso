var generators = require('yeoman-generator');
var _ = require('underscore');
var util = require('../util');

/**
 * Spawns a child process for the `gulp watch` command
 *
 * @param  {Object} yeoman-generator
 * @return {Object} ChildProcess object for the command
 */
function runGulpWatch(generator) {
  return generator.spawnCommand('gulp', ['watch']);
}

/**
 * Spawns a child process for the `npm install gulp --save-dev` command
 *
 * @param  {Object} yeoman-generator
 * @return {Object} ChildProcess object for the command
 */
function installLocalGulp(generator) {
  return generator.spawnCommand('npm', ['install', 'gulp', '--save-dev']);
}

module.exports = generators.NamedBase.extend({

  getPaths: function() {
    return {
      'app/index.html': {name: this.name || 'Your Torso App'},
      'app/home/homeView.js': {},
      'app/home/home-template.hbs': {},
      'app/home/_home.scss': {},
      'app/app.scss': {},
      'app/main.js': {},
      'app/router.js': {},
      'dist/.keepme': {},
      'package.json': {name: this.name || 'your-torso-app'},
      'gulpfile.js': {}
    };
  },

  writing: function() {
    var paths = this.getPaths();
    _.each(paths, function(context, path) {
      console.log('copying: ' + path);
      this.fs.copyTpl(
          this.templatePath(path),
          this.destinationPath(path),
          context
      );
    }, this);
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      {}
    );
  },

  install: function () {
    var generator = this;
    // Runs `npm install`
    generator.npmInstall('', function() {
      // Check for a global gulp module
      generator.spawnCommand('npm', ['ls', '-g', '--parseable', 'gulp'])
        .on('exit', function(code) {
          if (code === 1) {
            util.logWarningMessage('No global gulp was found...');
            installLocalGulp(generator)
              .on('exit', function() {
                util.logWarningMessage('Local gulp was installed and saved as a dependncy to the project');
                runGulpWatch(generator).on('exit', util.logGulpInstallWarning);
              });
          } else {
            util.logWarningMessage('Global gulp was found. Not adding gulp as a dependency and using the global one instead. Please call npm install gulp --save-dev if you would like to add gulp as a project dependency');
            runGulpWatch(generator);
          }
        });
    });
  }
});
