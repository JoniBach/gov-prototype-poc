import type { StepConfig } from './cli.ts';
import { 
  generateJourneyIndex, 
  generateHighLevelJourney, 
  generateLowLevelJourney 
} from './prompts.ts';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Configuration for the prototype generation pipeline
 * Each step has access to context containing results from previous steps
 */
export const prototypeSteps: StepConfig[] = [
  {
    name: 'input',
    description: 'Get prototype description from user',
    interactive: true,
    handler: async (context) => {
      console.log(chalk.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
      console.log(chalk.cyan.bold('  GOV.UK Prototype Generator'));
      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

      const { description } = await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          message: '📝 Enter the prototype description:',
          default: 'passport application',
          validate: (input) => {
            if (input.trim().length === 0) {
              return '❌ Description cannot be empty';
            }
            if (input.trim().length < 3) {
              return '❌ Description must be at least 3 characters';
            }
            return true;
          }
        }
      ]);
      
      console.log(chalk.gray(`\n   Using: "${chalk.white(description)}"\n`));
      return description;
    }
  },

  {
    name: 'journey-index',
    description: 'Generate journey index and blueprint',
    handler: async (context) => {
      const description = context.input;
      
      if (!description) {
        throw new Error('No description provided. Run the "input" step first.');
      }
      
      console.log(chalk.cyan('\n━━━ Step 1: Journey Index ━━━\n'));
      
      const journeyIndex = await generateJourneyIndex(description);
      
      if (!journeyIndex?.id) {
        throw new Error('Failed to generate journey index - no ID returned');
      }
      
      // Display journey details
      console.log(chalk.gray('\n   Journey Details:'));
      console.log(chalk.gray(`   ├─ ID: ${chalk.white(journeyIndex.id)}`));
      if (journeyIndex.title) {
        console.log(chalk.gray(`   ├─ Title: ${chalk.white(journeyIndex.title)}`));
      }
      if (journeyIndex.description) {
        console.log(chalk.gray(`   └─ Description: ${chalk.white(journeyIndex.description)}`));
      }
      
      return journeyIndex;
    }
  },

  {
    name: 'high-level',
    description: 'Generate high-level journey structure',
    handler: async (context) => {
      const journeyIndex = context['journey-index'];
      
      if (!journeyIndex?.id) {
        throw new Error('No journey index found. Run "journey-index" step first.');
      }
      
      console.log(chalk.cyan('\n━━━ Step 2: High-Level Design ━━━\n'));
      
      const journeyId = journeyIndex.id;
      const highLevelJourney = await generateHighLevelJourney(journeyId);
      
      if (!highLevelJourney || highLevelJourney.length === 0) {
        throw new Error('Failed to generate high-level journey - no pages returned');
      }
      
      // Show page breakdown
      console.log(chalk.gray('\n   Page Structure:'));
      highLevelJourney.forEach((page: any, index: number) => {
        const isLast = index === highLevelJourney.length - 1;
        const prefix = isLast ? '   └─' : '   ├─';
        const componentCount = page.components?.length || 0;
        console.log(chalk.gray(`${prefix} ${chalk.white(page.title)} ${chalk.dim(`(${componentCount} components)`)}`));
      });
      console.log();
      
      return highLevelJourney;
    }
  },

  {
    name: 'low-level',
    description: 'Generate detailed component configurations',
    handler: async (context) => {
      const journeyIndex = context['journey-index'];
      
      if (!journeyIndex?.id) {
        throw new Error('No journey index found. Run "journey-index" step first.');
      }
      
      console.log(chalk.cyan('\n━━━ Step 3: Component Configuration ━━━'));
      
      const journeyId = journeyIndex.id;
      const lowLevelJourney = await generateLowLevelJourney(journeyId);
      
      if (!lowLevelJourney || lowLevelJourney.length === 0) {
        throw new Error('Failed to generate low-level journey - no pages returned');
      }
      
      return lowLevelJourney;
    }
  },

  {
    name: 'summary',
    description: 'Display generation summary',
    handler: async (context) => {
      const journeyIndex = context['journey-index'];
      const lowLevel = context['low-level'];
      
      if (!journeyIndex || !lowLevel) {
        throw new Error('Missing data for summary');
      }
      
      const totalComponents = lowLevel.reduce((sum: number, page: any) => {
        return sum + (page.components?.length || 0);
      }, 0);
      
      console.log(chalk.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
      console.log(chalk.green.bold('  ✓ Generation Complete!'));
      console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
      
      console.log(chalk.bold('  Summary:'));
      console.log(chalk.gray('  ─────────────────────────────────────'));
      console.log(`  ${chalk.bold('Journey ID:')}      ${chalk.white(journeyIndex.id)}`);
      
      if (journeyIndex.title) {
        console.log(`  ${chalk.bold('Title:')}          ${chalk.white(journeyIndex.title)}`);
      }
      
      console.log(`  ${chalk.bold('Total Pages:')}    ${chalk.white(lowLevel.length)}`);
      console.log(`  ${chalk.bold('Total Components:')} ${chalk.white(totalComponents)}`);
      console.log(chalk.gray('  ─────────────────────────────────────'));
      
      console.log(`\n  ${chalk.bold('Output:')}         ${chalk.cyan(`static/journeys/${journeyIndex.id}.json`)}`);
      
      console.log(chalk.cyan('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));
      
      return {
        journeyId: journeyIndex.id,
        title: journeyIndex.title,
        totalPages: lowLevel.length,
        totalComponents: totalComponents,
        filePath: `static/journeys/${journeyIndex.id}.json`
      };
    }
  }
];