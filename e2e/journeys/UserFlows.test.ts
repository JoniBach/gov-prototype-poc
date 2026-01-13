import { test, expect, Page } from '@playwright/test';
import { useTextInput, valueForTextInput } from '../components/TextInput';
import { useRadios, valueForRadios } from '../components/Radios';
import { useCheckboxes, valueForCheckboxes } from '../components/Checkboxes';
import { useButton, valueForButton } from '../components/Button';
import { useLink } from '../components/Link';
import { journeys } from './journeys';
import { useCharacterCount, valueForCharacterCount } from '../components/CharacterCount';
import { useDateInput, valueForDateInput } from '../components/DateInput';
import { useFileUpload, valueForFileUpload } from '../components/FileUpload';
import { usePasswordInput, valueForPasswordInput } from '../components/PasswordInput';
import { useSelect, valueForSelect } from '../components/Select';
import { useTextarea, valueForTextarea } from '../components/Textarea';

test.describe('User Flows', () => {
    const journeyEntries = Object.entries(journeys);
    for (const [journeyId, journey] of journeyEntries) {
        test(`${journeyId} should complete the flow`, async ({ page }) => {

    const interactiveElements = {
        "CharacterCount": useCharacterCount,   
        "Checkboxes": useCheckboxes,
        "DateInput": useDateInput,
        "FileUpload": useFileUpload,
        "PasswordInput": usePasswordInput,
        "Radios": useRadios,
        "Select": useSelect,
        "TextInput": useTextInput,
        "Textarea": useTextarea,
        "Button": useButton,
    }
    
    const valueElements = {
        "CharacterCount": valueForCharacterCount,
        "Checkboxes": valueForCheckboxes,
        "DateInput": valueForDateInput,
        "FileUpload": valueForFileUpload,
        "PasswordInput": valueForPasswordInput,
        "Radios": valueForRadios,
        "Select": valueForSelect,
        "TextInput": valueForTextInput,
        "Textarea": valueForTextarea,
        "Button": valueForButton,
    }
    


const sequence = journey.flatMap((page: any) => page.components);
const filteredSequence = sequence.filter((component: any) => interactiveElements[component.component as keyof typeof interactiveElements] && !component.id.includes('change-answers') && !component.id.includes('start-again'));


// console.log(JSON.stringify(filteredSequence, null, 1));
console.log(`Starting flow test for ${journeyId}`);
  await page.goto('http://localhost:5173/journey');
  await useLink(page, { name: 'Basic Income Tax Calculator' });
  await useButton(page, { name: 'Start now' });

  const totalSteps = filteredSequence.filter((c: any) => c.id !== 'start-page-start-now-button').length;
  let step = 1;

  for (const component of filteredSequence as any[]) {
    if (component.id === 'start-page-start-now-button') continue;
    const componentType = component.component;
    const config = component.config;
    let value;
    if (componentType === 'Button') {
      console.log(`${step}/${totalSteps}: ${componentType} > ${config.text}`);
      await (interactiveElements[componentType as keyof typeof interactiveElements] as any)(page, { name: config.text });
    } else {
      value = (valueElements[componentType as keyof typeof valueElements] as any)(config, undefined);
      console.log(`${step}/${totalSteps}: ${componentType} > ${value}`);
      await (interactiveElements[componentType as keyof typeof interactiveElements] as any)(page, config, value);
    }
    step++;
  }
console.log(`Completed flow test for ${journeyId}`);
        });
    }
});