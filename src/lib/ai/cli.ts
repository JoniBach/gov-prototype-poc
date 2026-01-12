import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

export interface StepConfig {
  name: string;
  description: string;
  handler: (context: any) => Promise<any>;
  enabled?: boolean;
  interactive?: boolean;
}

export interface CLIOptions {
  steps: StepConfig[];
  programName?: string;
  programDescription?: string;
  programVersion?: string;
}

/**
 * Configurable CLI runner
 * Pass in an array of steps and this handles the CLI interface
 */
export async function runCLI(options: CLIOptions) {
  const program = new Command();
  
  program
    .name(options.programName || 'cli')
    .description(options.programDescription || 'Configurable CLI tool')
    .version(options.programVersion || '1.0.0');

  // Main run command
  program
    .command('run')
    .description('Run the pipeline')
    .argument('[description...]', 'Prototype description (optional)')
    .option('-s, --steps <steps>', 'Comma-separated step names to run (runs all enabled steps if not specified)')
    .option('-i, --interactive', 'Interactively select which steps to run')
    .option('--skip <steps>', 'Comma-separated step names to skip')
    .option('-m, --multi <count>', 'Run the pipeline multiple times sequentially (default: 1)', '1')
    .action(async (description, cmdOptions) => {
      cmdOptions.description = description.join(' ');
      await runPipeline(options.steps, cmdOptions);
    });

  // List command
  program
    .command('list')
    .description('List all available steps')
    .action(() => {
      listSteps(options.steps);
    });

  program.parse();
}

/**
 * Run the pipeline with selected steps
 */
async function runPipeline(steps: StepConfig[], cmdOptions: any) {
  const multiCount = parseInt(cmdOptions.multi) || 1;
  
  if (multiCount > 1) {
    console.log(chalk.blue(`\n🔄 Running pipeline ${multiCount} time(s) sequentially...\n`));
  }

  for (let iteration = 1; iteration <= multiCount; iteration++) {
    if (multiCount > 1) {
      console.log(chalk.cyan(`\n━━━ Iteration ${iteration}/${multiCount} ━━━\n`));
    }

    const context: Record<string, any> = {};
    context.cmdOptions = cmdOptions; // Add cmdOptions to context for handlers to access
    let stepsToRun = steps.filter(s => s.enabled !== false);

    // Interactive mode - let user select steps
    if (cmdOptions.interactive) {
      const { selectedSteps } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedSteps',
          message: 'Select steps to run:',
          choices: steps.map(s => ({
            name: `${s.name} - ${s.description}`,
            value: s.name,
            checked: s.enabled !== false
          }))
        }
      ]);
      stepsToRun = steps.filter(s => selectedSteps.includes(s.name));
    }
    // Run specific steps
    else if (cmdOptions.steps) {
      const stepNames = cmdOptions.steps.split(',').map((s: string) => s.trim());
      stepsToRun = steps.filter(s => stepNames.includes(s.name));
      
      // Validate step names
      const validNames = steps.map(s => s.name);
      const invalidNames = stepNames.filter(name => !validNames.includes(name));
      if (invalidNames.length > 0) {
        console.error(chalk.red(`\n❌ Invalid step names: ${invalidNames.join(', ')}`));
        console.log(chalk.gray('Run "list" command to see available steps\n'));
        process.exit(1);
      }
    }
    // Skip specific steps
    else if (cmdOptions.skip) {
      const skipNames = cmdOptions.skip.split(',').map((s: string) => s.trim());
      stepsToRun = stepsToRun.filter(s => !skipNames.includes(s.name));
    }

    if (stepsToRun.length === 0) {
      console.log(chalk.yellow('\n⚠️  No steps selected to run\n'));
      continue; // Skip this iteration instead of returning
    }

    // Execute the pipeline
    console.log(chalk.blue(`\n🚀 Running ${stepsToRun.length} step(s)...\n`));
    
    for (const step of stepsToRun) {
      if (step.interactive) {
        // Interactive steps don't use spinner to avoid interference
        try {
          const result = await step.handler(context);
          context[step.name] = result;
          console.log(chalk.green(`✓ ${step.name}`));
        } catch (error) {
          console.error(chalk.red(`✗ ${step.name} failed`));
          if (error instanceof Error) {
            console.error(chalk.red(`\n  Error: ${error.message}\n`));
          } else {
            console.error(chalk.red('\n  Unknown error occurred\n'));
          }
          process.exit(1);
        }
      } else {
        const spinner = ora({
          text: step.description,
          color: 'cyan'
        }).start();
        
        try {
          const result = await step.handler(context);
          context[step.name] = result;
          spinner.succeed(chalk.green(step.name));
        } catch (error) {
          spinner.fail(chalk.red(`${step.name} failed`));
          if (error instanceof Error) {
            console.error(chalk.red(`\n  Error: ${error.message}\n`));
          } else {
            console.error(chalk.red('\n  Unknown error occurred\n'));
          }
          process.exit(1);
        }
      }
    }

    console.log(chalk.green.bold('\n✅ Pipeline completed successfully!\n'));
  }

  if (multiCount > 1) {
    console.log(chalk.green.bold(`\n🎉 All ${multiCount} iteration(s) completed successfully!\n`));
  }
}

/**
 * List all available steps
 */
function listSteps(steps: StepConfig[]) {
  console.log(chalk.bold('\nAvailable steps:\n'));
  
  steps.forEach((step, i) => {
    const status = step.enabled !== false ? chalk.green('✓') : chalk.gray('○');
    const enabledText = step.enabled === false ? chalk.gray('[disabled]') : '';
    
    console.log(`${i + 1}. ${status} ${chalk.bold(step.name)} ${enabledText}`);
    console.log(`   ${chalk.gray(step.description)}\n`);
  });
  
  console.log(chalk.gray('Usage:'));
  console.log(chalk.gray('  run                    Run all enabled steps'));
  console.log(chalk.gray('  run -i                 Interactive mode'));
  console.log(chalk.gray('  run -s step1,step2     Run specific steps'));
  console.log(chalk.gray('  run --skip step1       Run all except specified steps'));
  console.log();
}

/**
 * Export for programmatic use (without CLI)
 */
export async function executePipeline(steps: StepConfig[]): Promise<any> {
  const context = {};
  const stepsToRun = steps.filter(s => s.enabled !== false);
  
  for (const step of stepsToRun) {
    try {
      const result = await step.handler(context);
      context[step.name] = result;
    } catch (error) {
      console.error(`Step ${step.name} failed:`, error);
      throw error;
    }
  }
  
  return context;
}