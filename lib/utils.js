const { readFileSync, writeFileSync, readdirSync, statSync } = require('fs-extra');
const path = require('path');
const { TEMPLATE_DIR } = require('./constants');

const readPackageJson = (targetDir) => {
  const packageJsonPath = path.resolve(targetDir, 'package.json');
  let packageJson
  try {
    packageJson = readFileSync(packageJsonPath, 'utf-8');
    packageJson = JSON.parse(packageJson);
  } catch (err) {
    throw new Error('package.json is non-existent or malformed');
  }
  return packageJson;
};
const writePackageJson = (targetDir, packageJson) => {
  const packageJsonPath = path.resolve(targetDir, 'package.json');
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
};

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

const updateTemplateByAnswers = (answers, targetDir) => {
  if (!answers.isMobile) return;

  try {
    // handle package.json
    const packageJson = readPackageJson(targetDir);
    delete packageJson.dependencies['ant-design-vue'];
    packageJson.dependencies['vant'] = '^4.8.0';
    packageJson.devDependencies['postcss-px-to-viewport'] = '^1.1.1';
    writePackageJson(targetDir, packageJson);

    // handle bundler config
    const bundlerConfigPath = path.resolve(targetDir, 'vite.config.ts');
    let bundlerConfig = readFileSync(bundlerConfigPath, 'utf-8');
    bundlerConfig = bundlerConfig
      .replace(/ant-design-vue/g, 'vant')
      .replace(/AntDesignVueResolver/g, 'VantResolver')
      .replace(/VantResolver\([\s\S]*?\)/g, 'VantResolver()');
    writeFileSync(bundlerConfigPath, bundlerConfig, 'utf-8');
    // handle components '<a-' -> '<van-'
    const srcPath = path.resolve(targetDir, 'src');
    handleDir(srcPath);
    async function handleDir(dir) {
      const files = readdirSync(dir);
      await Promise.all(
        files.map(filename => {
          const filePath = path.resolve(dir, filename);
          if (statSync(filePath).isDirectory()) {
            return handleDir(filePath);
          } else {
            if (!filePath.endsWith('.vue')) return;
            let code = readFileSync(filePath, 'utf-8');
            code = code.replace(/(<\/?)a-/g, '$1van-');
            writeFileSync(filePath, code, 'utf-8');
          }
        })
      );
    }

    // handle postcss config
    const postcssConfigPath = path.resolve(targetDir, '.postcssrc.ts');
    let postcssConfig = readFileSync(postcssConfigPath, 'utf-8');
    postcssConfig = postcssConfig.replace('/* PostcssPlugins */',
      `require('postcss-px-to-viewport')({
        viewportWidth: 375,
        unitPrecision: 6,
        selectorBlackList: [],
      }),`
    );
    writeFileSync(postcssConfigPath, postcssConfig, 'utf-8');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getTemplateDirectories,
  getDefaultAnswersByPrompts,
  updateTemplateByAnswers
};