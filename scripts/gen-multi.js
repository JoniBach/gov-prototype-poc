#!/usr/bin/env node

import { spawnSync } from 'child_process';

const count = process.argv[2] || '2';
console.log(`Running ${count} iterations of self assessment generation...`);

// First generate all journeys without individual testing
const genResult = spawnSync('npm', ['run', 'gen', '--', '--multi', count, '--skip', 'test', 'self', 'assessment'], {
  stdio: 'inherit',
  shell: true
});

if (genResult.status !== 0) {
  console.error('Generation failed');
  process.exit(genResult.status);
}

// Then run all tests at the end
console.log('Running tests for all generated journeys...');
const testResult = spawnSync('npm', ['run', 'test:journeys'], {
  stdio: 'inherit',
  shell: true
});

process.exit(testResult.status);
