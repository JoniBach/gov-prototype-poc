import { runCLI } from './cli.ts';
import { prototypeSteps } from './gen.ts';

/**
 * Entry point for the prototype generator CLI
 * 
 * Usage:
 *   node main.ts run              - Run all steps
 *   node main.ts run -i           - Interactive mode
 *   node main.ts run -s input,journey-index  - Run specific steps
 *   node main.ts run --skip summary - Skip specific steps
 *   node main.ts list             - List all available steps
 */

runCLI({
  programName: 'prototype-gen',
  programDescription: 'Generate GOV.UK service prototypes using AI',
  programVersion: '1.0.0',
  steps: prototypeSteps
});