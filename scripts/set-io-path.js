import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, '../package.json');

const args = process.argv.slice(2);
const newPath = args[0];

if (!newPath) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide a path to the internet-object library.');
  console.log('Usage: npm run config-io -- <path>');
  console.log('Example: npm run config-io -- ../io-js2');
  process.exit(1);
}

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Create a backup
  // fs.copyFileSync(packageJsonPath, `${packageJsonPath}.bak`);

  // Update dependency
  // Ensure the path is formatted correctly for file: protocol
  // You might want to resolve relative paths or keep them as string
  const dependencyPath = `file:${newPath}`;
  packageJson.dependencies['internet-object'] = dependencyPath;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('\x1b[32m%s\x1b[0m', `Successfully updated internet-object path to: ${dependencyPath}`);
  console.log('Please run "yarn install" or "npm install" to apply changes.');

} catch (error) {
  console.error('Error updating package.json:', error);
  process.exit(1);
}
