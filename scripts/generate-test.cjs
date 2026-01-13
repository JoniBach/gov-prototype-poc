const fs = require('fs');
const path = require('path');

const journeyPath = path.join(__dirname, '..', 'static', 'journeys', 'basic-income-tax-calculator-1HqNA9.json');
const journey = JSON.parse(fs.readFileSync(journeyPath));

const testData = {
  'textbox': {
    'Annual income': { action: 'fill', value: '12345' },
    'Tax Code': { action: 'fill', value: '123' }
  },
  'radio': {
    'Weekly': { action: 'check' },
    'England': { action: 'check' }
  },
  'checkbox': {
    'Freelance work': { action: 'check' },
    'Rental income': { action: 'check' },
    'Personal allowance': { action: 'check' },
    'Code 0T': { action: 'check' }
  },
  'button': {
    'Start now': { action: 'click' },
    'Continue': { action: 'click' },
    'Confirm': { action: 'click' },
    'Start again': { action: 'click' }
  }
};

let testCode = `import { test, expect } from '@playwright/test';

test('basic income tax calculator', async ({ page }) => {
  await page.goto('http://localhost:5173/journey');
  await page.getByRole('link', { name: 'Basic Income Tax Calculator' }).click();
`;

for (const step of journey) {
  for (const comp of step.components) {
    if (comp.component === 'TextInput' && testData.textbox[comp.config.label.text]) {
      const label = comp.config.label.text;
      testCode += `  await page.getByRole('textbox', { name: '${label}' }).click();\n`;
      testCode += `  await page.getByRole('textbox', { name: '${label}' }).fill('${testData.textbox[label].value}');\n`;
    } else if (comp.component === 'Radios') {
      for (const item of comp.config.items) {
        if (testData.radio[item.text]) {
          testCode += `  await page.getByRole('radio', { name: '${item.text}' }).check();\n`;
        }
      }
    } else if (comp.component === 'Checkboxes') {
      for (const item of comp.config.items) {
        if (testData.checkbox[item.text]) {
          testCode += `  await page.getByRole('checkbox', { name: '${item.text}' }).check();\n`;
        }
      }
    } else if (comp.component === 'Button' && testData.button[comp.config.text]) {
      const text = comp.config.text;
      testCode += `  await page.getByRole('button', { name: '${text}' }).click();\n`;
    }
  }
}

testCode += `});\n`;

console.log(testCode);
