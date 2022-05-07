const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const memFs = require("mem-fs");
const memFsEditor = require("mem-fs-editor");
const inquirer = require('inquirer');
const validateProjectName = require('validate-npm-package-name');

const store = memFs.create();
const editor = memFsEditor.create(store);

const prompts = [
  {
    name: 'description',
    message: '请输入项目描述',
    default: 'a project created by cli'
  },
  {
    name: 'author',
    message: '请输入作者名称',
    default: 'James Tian<thjjames@163.com>'
  }
];

const create = async (name, options, targetDir) => {
  const answers = await inquirer.prompt(prompts);

  const templateDir = path.join(__dirname, '../template');
  console.log(chalk.bold(`Creating a new project in ${targetDir}...`));

  if (fse.existsSync(targetDir)) {
    fse.removeSync(targetDir);
  }

  // fse.copySync(templateDir, targetDir);
  editor.copyTpl(templateDir, targetDir, { name, options, answers });
  editor.commit(); // Persist every changes made to files in the mem-fs store to disk
  console.log(chalk.green.bold('√ Create successfully'));
};

module.exports = (name, options) => {
  options.name = name;
  const targetDir = path.resolve(name);

  const result = validateProjectName(name);
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: ${name}.`));
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.warn(chalk.yellow.dim('Warning: ' + warn))
    })
    process.exit(1);
  }

  if (fse.existsSync(targetDir) && !options.force) {
    console.error(chalk.red(`Folder ${targetDir} is already in use, please rename or overwrite it by using option -f.`));
    process.exit(1);
  } else {
    create(name, options, targetDir);
  }
};