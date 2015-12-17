var _ = require('underscore');
var colors = require('colors');

// Set underscore's template system to use handlebars syntax
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

// Configurations for colors module
colors.setTheme({
  warning: 'cyan',
  command: 'magenta'
});

/**
 * Object containing context for template compilation
 * and functions for text stylingContext.
 * @type {Object}
 */
var stylingContext = {
  warningSign: ('<'.cyan + '!'.red + '>'.cyan),
  prompt: '$'.cyan,
  locally: 'locally'.yellow,
  globally: 'globally'.yellow
};

/**
 * Creates a template function for a warning message
 * @param  {String} rawString template to be compiled
 * @return {Function}         wrapped underscore template function
 */
function warningTemplate(rawString) {
  var template = _.template(rawString);
  return function (context) {
    return template(context).warning;
  }
}

/**
 * Creates a template function for a command message
 * @param  {String} rawString template to be compiled
 * @return {Function}         wrapped underscore template function
 */
function commandTemplate(rawString) {
  var template = _.template(rawString);
  return function (context) {
    return template(context).command;
  }
}

/**
 * Template function for the warning message that is displayed post-build when
 * the user does not have a global instillation of gulp.
 *
 * Any indentation added to this string will also show up as output.
 * @type {Function}
 */
var gulpInstallWarningTemplate = warningTemplate(
'\n{{warningSign}} We have installed gulp {{locally}} to your project. \
To use the gulp tasks, you will need to use the \
npm run cli with the following command:\n\
  {{localGulpCommand}}\n\n\
To remove gulp {{locally}} and setup gulp {{globally}}, run the following command:\n\
  {{setupGlobalGulpCommand}}'
  );

/**
 * Template function for the command that the user can run to execute gulp tasks.
 * @type {Function}
 */
var localGulpCmdTemplate = commandTemplate('{{prompt}} npm run gulp <task>');

/**
 * Template function for the command that the user can run to uninstall a local gulp installation
 * and install gulp globally.
 * @type {Function}
 */
var setupGlobalGulpCmdTemplate = commandTemplate('{{prompt}} npm uninstall gulp && npm install -g gulp');

/**
 * Template function for the message output from logWarningMessage.
 * @type {Function}
 */
var warningMessageTemplate = warningTemplate('{{warningSign}} {{message}}');

/**
 * Creates a new object containing both the stylingContext
 * and additional elements specific to the template
 * @param  {Object} templateContext object containing elements specific to given template
 * @return {Object}                 the full context object to be used to build the styled template
 */
function generateContext(templateContext) {
  return _.extend({}, stylingContext, templateContext);
}

/**
 * Compiles all the templates for the install warning that is triggered
 * when no global installation of gulp is detected
 * @return {String} the styled message for use in yeoman installation
 */
function compileGulpInstallWarningMessage() {
  var context = generateContext({
              localGulpCommand: localGulpCmdTemplate(stylingContext),
              setupGlobalGulpCommand: setupGlobalGulpCmdTemplate(stylingContext)
            });

  return gulpInstallWarningTemplate(context);
}

/**
 * Compiles the warning message template using the given message
 * @param  {String} message to be styled and injected into the proper template
 * @return {String}         the styled warning message
 */
function compileWarningMessage(message) {
  var context = generateContext({message: message});
  return warningMessageTemplate(context);
}

module.exports = {
  gulpInstallWarningMessage: compileGulpInstallWarningMessage(),
  compileWarningMessage: compileWarningMessage
};