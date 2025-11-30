#!/usr/bin/env node

const { spawn } = require('child_process');

const bun = spawn('bun', ['run', 'src/index.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  env: { ...process.env }
});

process.on('SIGTERM', () => bun.kill('SIGTERM'));
process.on('SIGINT', () => bun.kill('SIGINT'));

bun.on('exit', (code) => process.exit(code || 0));
