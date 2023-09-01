// const { execSync } = require('child_process');
const { getTemplateDirectories } = require('./utils');
// const { templateDir } = require('./consts');

module.exports = () => {
  // const result = execSync('ls -l', {
  //   cwd: templateDir
  // });
  // console.log(result.toString());
  console.log(getTemplateDirectories().join('\n'));
};