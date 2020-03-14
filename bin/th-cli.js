#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const currentNodeVersion = process.versions.node;
const requiredNodeVersion = semver.minVersion(require('../package.json').engines.node).version;
const cliName = require('../package.json').name;

if (semver.lt(currentNodeVersion, requiredNodeVersion)) {
    console.log(chalk.red(`You are running Node ${currentNodeVersion}.`));
    console.log(chalk.red(`${cliName} requires Node ${requiredNodeVersion} or higher.`));
    console.log(chalk.red(`Please upgrade your Node version.`));
    process.exit(1);
}

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const validatePackageName = require('validate-npm-package-name');
const util = require('../util');

program
    .version(require('../package.json').version, '-v, --version')
    .usage('<command> [options]')
    // output help information on unknown commands
    // .arguments('<command>')
    .action(cmd => {
        console.log(chalk.red(`Unknown command ${chalk.bold(cmd)}.`))
        program.outputHelp()
    });

program
    .command('create <project-name>')
    .description('create a new project by th-cli')
    .option('-f, --force', 'overwrite target directory if it exists')
    .action((name, cmd) => {
        create(name, util.cleanArgs(cmd));
    });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

function create(name, option) {
    const rootDir = path.resolve(name);
    const templateDir = path.join(__dirname, '../template');
    const baseName = path.basename(name);

    if (!validatePackageName(baseName).validForNewPackages) {
        console.log(chalk.red(`Could not create a project called ${baseName} because of npm naming restrictions.`));
        process.exit(1);
    }

    console.log(chalk.bold(`Creating a new project in ${rootDir}...`));
    if (fs.existsSync(rootDir)) {
        if (option.force) {
            fs.removeSync(rootDir);
            fs.copySync(templateDir, rootDir);
        } else {
            console.log(chalk.red(`Folder ${rootDir} is already in use, please rename it or overwrite it by using option -f.`));
            process.exit(1);
        }
    } else {
        fs.ensureDirSync(rootDir);
        fs.copySync(templateDir, rootDir);
    }
    console.log(chalk.bold('Completed'));
}
