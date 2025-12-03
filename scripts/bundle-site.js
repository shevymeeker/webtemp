const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const archiveName = 'dismantle-demo-site.zip';
const archivePath = path.join(__dirname, '..', archiveName);
const docsDir = path.join(__dirname, '..', 'docs');

if (!fs.existsSync(docsDir)) {
  console.error('❌ docs/ directory is missing. Nothing to package.');
  process.exit(1);
}

if (fs.existsSync(archivePath)) {
  fs.unlinkSync(archivePath);
}

console.log(`📦 Creating ${archiveName} from docs/ ...`);
try {
  execSync(`cd "${docsDir}" && zip -r "${archivePath}" .`, { stdio: 'inherit' });
  console.log(`✅ Archive created at ${archivePath}`);
} catch (error) {
  console.error('❌ Failed to create archive. Ensure the "zip" utility is installed.');
  process.exit(1);
}
