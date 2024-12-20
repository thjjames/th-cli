import fs from 'node:fs';
import path from 'node:path'
import { exec, execSync } from 'node:child_process';
import { promisify } from 'node:util';
import { cpus } from 'node:os';

const execAsync = promisify(exec);

const readPackageJson = (targetDir) => {
  const packageJsonPath = path.resolve(targetDir, 'package.json');
  let packageJson
  try {
    packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
    packageJson = JSON.parse(packageJson);
  } catch (err) {
    throw new Error('package.json is non-existent or malformed');
  }
  return packageJson;
};

/**
 * Runs iterator function in parallel.
 * @param {number} maxConcurrency - The maximum concurrency.
 * @param {Array<T>} source - The data source
 * @param {(item: T) => Promise<void>} iteratorFn - The iteratorFn
 * @returns {Promise<void[]>} - A Promise array containing all iteration results.
 */
const runParallel = async (maxConcurrency, source, iteratorFn) => {
  const ret = [];
  const executing = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (maxConcurrency < source.length) {
      const e = p.then(() => {
        executing.splice(executing.indexOf(e), 1);
      })
      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
};

/**
 * Builds the target.
 * @param {string} target - The target to build.
 * @returns {Promise<void>} - A promise representing the build process.
 */
const build = async (target) => {
  let buildScript = `build:${process.env.APP_MODE}`;
  if (!readPackageJson(target).scripts[buildScript]) {
    buildScript = 'build';
  }

  // execSync(`pnpm --dir ${target} run ${buildScript}`, {
  //   stdio: 'inherit'
  // });
  
  return execAsync(`pnpm --dir ${target} run ${buildScript}`, {
    env: {
      ...process.env,
      FORCE_COLOR: true
    }
  }).then(({
    stderr,
    stdout
  }) => {
    console.log(stderr);
    console.log(stdout);
    return {
      stderr,
      stdout
    };
  });
};

const targets = fs.readdirSync('packages')
  .filter(
    dir => fs.statSync(`packages/${dir}`).isDirectory() && fs.existsSync(`packages/${dir}/package.json`)
  )
  .map(
    dir => path.join('packages', dir)
  );
await runParallel(cpus().length, targets, build);
console.log('Build successfully');
