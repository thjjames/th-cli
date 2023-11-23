const { readFileSync, readdirSync, statSync } = require('fs-extra');
const path = require('path');
const { TEMPLATE_DIR } = require('./constants');

const readPackageJson = (targetDir) => {
  const packageJsonPath = path.resolve(targetDir, 'package.json');
  try {
    let packageJson = readFileSync(packageJsonPath, 'utf-8');
    packageJson = JSON.parse(packageJson);
  } catch (err) {
    throw new Error('package.json is malformed');
  }
  return packageJson;
};
// writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');

const getTemplateDirectories = () => {
  return readdirSync(TEMPLATE_DIR).filter(dir => {
    return statSync(path.resolve(TEMPLATE_DIR, dir)).isDirectory();
  });
};

const getDefaultAnswersByPrompts = (prompts) => {
  return prompts.reduce((answers, prompt) => {
    answers[prompt.name] = prompt.default;
    return answers;
  }, {});
};

module.exports = {
  readPackageJson,
  getTemplateDirectories,
  getDefaultAnswersByPrompts
};