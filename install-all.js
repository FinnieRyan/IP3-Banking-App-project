import { execSync } from 'child_process';
import path from 'path';

const installNpmPackages = async (directory) => {
  try {
    console.log(`Running npm install in ${directory}...`);
    await execSync('npm install', { cwd: directory, stdio: 'inherit' });
    console.log(`npm install in ${directory} completed successfully.`);
  } catch (error) {
    console.error(`Error during npm install in ${directory}:`, error);
    process.exit(1);
  }
};

if (!process.env.RUNNING_NPM_INSTALL) {
  process.env.RUNNING_NPM_INSTALL = 'true';

  try {
    console.log('Running npm install at the top level...');
    await installNpmPackages(path.resolve());

    console.log('Navigating to ./frontend and running npm install...');
    const frontendDir = path.resolve('frontend');
    await installNpmPackages(frontendDir);

    console.log('All installations are complete.');
  } catch (error) {
    console.error('Error during installation:', error);
    process.exit(1);
  }
} else {
  console.log(
    'Installation script already running. Skipping to avoid infinite loop.'
  );
}
