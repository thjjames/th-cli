#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const currentNodeVersion = process.versions.node;
const requiredNodeVersion = semver.minVersion(require('../package.json').engines.node).version;
const cliName = require('../package.json').name;

if (semver.lt(currentNodeVersion, requiredNodeVersion)) {
  console.error(chalk.red(`You are running Node ${currentNodeVersion}.`));
  console.error(chalk.red(`${cliName} requires Node ${requiredNodeVersion} or higher.`));
  console.error(chalk.red(`Please upgrade your Node version.`));
  process.exit(1);
}

const program = require('commander');
const minimist = require('minimist');

program
  .version(require('../package.json').version, '-v, --version')
  .usage('<command> [options]')

program
  .command('create <project-name>')
  .description('create a new project by th-cli')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, options) => {
    if (minimist(process.argv.slice(2))._.length > 1) {
      console.warn(chalk.yellow('You provided more than one argument.'))
      console.warn(chalk.yellow('The first one will be used as the project name, the rest are ignored.'))
    }
    require('../lib/create')(name, options);
  });

program.parse(process.argv);
