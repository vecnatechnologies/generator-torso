/**
 * File copied and modified from https://github.com/yeoman/generator-backbone
 */

'use strict';
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var messages = require('./messages');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite(args) {
  // check if splicable is already in the body text
  var re = new RegExp(args.splicable.map(function (line) {
    return '\s*' + escapeRegExp(line);
  })
  .join('\n'));

  if (re.test(args.haystack)) {
    return args.haystack;
  }

  var lines = args.haystack.split('\n');

  if (!args.addLineAtEnd) {
    var otherwiseLineIndex = 0;
    lines.forEach(function (line, i) {
      if (line.indexOf(args.needle) !== -1) {
        otherwiseLineIndex = i;
      }
    });

    var spaces = 0;
    while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
      spaces += 1;
    }

    var spaceStr = '';
    while ((spaces -= 1) >= 0) {
      spaceStr += ' ';
    }

    lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
      return spaceStr + line;
    }).join('\n'));
  } else {
    lines = lines.concat(args.splicable);
  }

  return lines.join('\n');
}

function rewriteFile(args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.haystack = fs.readFileSync(fullPath, 'utf8');
  var body = rewrite(args);

  fs.writeFileSync(fullPath, body);
}

/**
 * Outputs a warning message to the console
 *
 * Example:
 *
 * logWarningMessage('Help, I\'m trapped in a JavaScript module!');
 *
 * $ <!> Help, I'm trapped in a JavaScript module!
 *
 * @param  {String} message to be output to console as a warning message
 */
function logWarningMessage(message) {
  var warningMessage = messages.compileWarningMessage(message);
  console.log(warningMessage);
}

/**
 * Displays a message in the console that warns the user that gulp was installed
 * locally and gives the user the steps required use a local gulp installation
 * and how to remove the local installation of gulp and install a global installation.
 */
function logGulpInstallWarning() {
  console.log(messages.gulpInstallWarningMessage);
}

module.exports = {
  rewrite: rewrite,
  rewriteFile: rewriteFile,
  logWarningMessage: logWarningMessage,
  logGulpInstallWarning: logGulpInstallWarning
};