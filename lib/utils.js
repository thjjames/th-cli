const { readdirSync, statSync } = require('fs-extra');
const path = require('path');
const { templateDir } = require('./consts');

const getTemplateDirectories = () => {
  return readdirSync(templateDir).filter(dir => {
    return statSync(path.resolve(templateDir, dir)).isDirectory();
  });
};
const getDefaultAnswersByPrompts = (prompts) => {
  return prompts.reduce((answers, prompt) => {
    answers[prompt.name] = prompt.default;
    return answers;
  }, {});
};

module.exports = {
  getTemplateDirectories,
  getDefaultAnswersByPrompts
};