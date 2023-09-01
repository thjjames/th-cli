// const { execSync } = require('child_process');
const { getTemplateDirectories } = require('./utils');
// const { TEMPLATE_DIR } = require('./consts');

module.exports = () => {
  // const result = execSync('ls -l', {
  //   cwd: TEMPLATE_DIR
  // });
  // console.log(result.toString());
  console.log(getTemplateDirectories().join('\n'));
};