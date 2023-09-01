const { readdirSync, statSync } = require('fs-extra');
const path = require('path');
const { TEMPLATE_DIR } = require('./constants');

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
  getTemplateDirectories,
  getDefaultAnswersByPrompts
};