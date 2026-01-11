import type { StepConfig } from './cli.ts';
import { 
  generateJourneyIndex, 
  generateHighLevelJourney, 
  generateLowLevelJourney 
} from './prompts.ts';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { executePipeline } from './cli.ts';

/**
 * Configuration for the prototype generation pipeline
 * Each step has access to context containing results from previous steps
 */
export const prototypeSteps: StepConfig[] = [
  {
    name: 'input',
    description: 'Get prototype description from user',
    handler: async (context) => {
      const { description } = await inquirer.prompt([
        {
          type: 'input',
          name: 'description',
          message: 'Enter the prototype description:',
          default: 'passport application',
          validate: (input) => {
            if (input.trim().length === 0) {
              return 'Description cannot be empty';
            }
            return true;
          }
        }
      ]);
      
      console.log(chalk.gray(`\n  Using description: "${description}"\n`));
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
      
      const journeyIndex = await generateJourneyIndex(description);
      
      if (!journeyIndex?.id) {
        throw new Error('Failed to generate journey index - no ID returned');
      }
      
      console.log(chalk.gray(`  Journey ID: ${journeyIndex.id}`));
      
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
      
      const journeyId = journeyIndex.id;
      const highLevelJourney = await generateHighLevelJourney(journeyId);
      
      if (!highLevelJourney || highLevelJourney.length === 0) {
        throw new Error('Failed to generate high-level journey - no pages returned');
      }
      
      console.log(chalk.gray(`  Generated ${highLevelJourney.length} page(s)`));
      
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
      
      const journeyId = journeyIndex.id;
      const lowLevelJourney = await generateLowLevelJourney(journeyId);
      
      if (!lowLevelJourney || lowLevelJourney.length === 0) {
        throw new Error('Failed to generate low-level journey - no pages returned');
      }
      
      console.log(chalk.gray(`  Configured ${lowLevelJourney.length} page(s)`));
      
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
      
      console.log(chalk.bold('\n📊 Generation Summary:'));
      console.log(chalk.gray('─────────────────────────────────'));
      console.log(`   ${chalk.bold('Journey ID:')} ${journeyIndex.id}`);
      console.log(`   ${chalk.bold('Title:')} ${journeyIndex.title || 'N/A'}`);
      console.log(`   ${chalk.bold('Total Pages:')} ${lowLevel.length}`);
      console.log(`   ${chalk.bold('Total Components:')} ${totalComponents}`);
      console.log(`   ${chalk.bold('Output File:')} static/journeys/${journeyIndex.id}.json`);
      console.log(chalk.gray('─────────────────────────────────\n'));
      
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

/**
 * Run the generation pipeline
 */
executePipeline(prototypeSteps).catch((error) => {
  console.error('Pipeline failed:', error);
  process.exit(1);
});