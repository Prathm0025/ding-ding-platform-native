// eas-build-pre-install.js
const { execSync } = require('child_process');

console.log('🔧 Running custom pnpm install');
execSync('pnpm install', { stdio: 'inherit' });
