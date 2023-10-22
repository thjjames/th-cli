const os = require('os')
const fse = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const { promisify } = require("util");
const chalk = require('chalk');
const ora = require('ora');
const memFs = require("mem-fs");
const memFsEditor = require("mem-fs-editor");
const inquirer = require('inquirer');
const validateProjectName = require('validate-npm-package-name');
const downloadGitRepo = require('download-git-repo');
const { getTemplateDirectories, getDefaultAnswersByPrompts } = require('./utils');
const { TEMPLATE_DIR } = require('./constants');

const store = memFs.create();
const editor = memFsEditor.create(store);
const downloadGitRepoAsync = promisify(downloadGitRepo);

const prompts = [
  {
    name: 'type',
    type: 'list',
    message: '请选择获取模板方式',
    default: 'preset',
    choices: [
      { value: 'preset', name: '预设模板' },
      { value: 'remote', name: '远程模板' }
    ]
  },
  {
    name: 'preset',
    type: 'list',
    message: '请选择预设模板',
    default: 'vue3+vite',
    choices: getTemplateDirectories().map(name => ({
      name,
      value: name,
    })),
    when: function(answers) {
      return answers.type === 'preset';
    }
  },
  {
    name: 'repository',
    message: '请输入远程模板地址',
    default: 'thjjames/react16',
    when: function(answers) {
      return answers.type === 'remote';
    }
  },
  {
    name: 'description',
    message: '请输入项目描述',
    default: 'a project created by th-cli'
  },
  {
    name: 'author',
    message: '请输入作者名称',
    default: 'James Tian<thjjames@163.com>'
  }
];

const copy = (name, answers, targetDir, templateDir) => {
  // fse.copySync(templateDir, targetDir);
  return new Promise(async (resolve, reject) => {
    await editor.copyTplAsync(templateDir, targetDir, { name, answers }, {}, {
      globOptions: {
        ignore: ['!**/node_modules'],
        dot: true // This will make the glob starting with dot effective
      }
    });
    await editor.commit(resolve); // Persist every changes made to files in the mem-fs store to disk
  });
};
const create = async (name, options, targetDir) => {
  const answers = options.default ? getDefaultAnswersByPrompts(prompts) : await inquirer.prompt(prompts);
  const templateDir = answers.type === 'preset' ? path.resolve(TEMPLATE_DIR, answers.preset) : path.resolve(os.tmpdir(), `cli-tmp-${name}`);
  const spinner = ora(`Creating a new project in ${targetDir}, please wait...\n`).start();

  try {
    if (answers.type === 'preset') {
      await copy(name, answers, targetDir, templateDir);
    } else {
      await downloadGitRepoAsync(answers.repository, templateDir, {
        clone: options.clone
      });
      await copy(name, answers, targetDir, templateDir);
      fse.removeSync(templateDir);
    }
    execSync('git init', {
      cwd: targetDir
    });
    spinner.succeed('Create successfully');
  } catch (err) {
    spinner.fail(err);
  }
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

  if (fse.existsSync(targetDir)) {
    if (options.force) {
      fse.removeSync(targetDir);
    } else {
      console.error(chalk.red(`Folder ${targetDir} is already in use, please rename or overwrite it by using option -f.`));
      process.exit(1);
    }
  }
  create(name, options, targetDir);
};