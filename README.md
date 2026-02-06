# Playwright Gen POC
A proof of concept for AI enhanced left shift test automation

## Brief intro
This POC investigates one particular way of working with AI. Although its currently one cohesive monolith, conceptually, you could consider it as being the sum of three parts.

1. **Dynamic UI Prototype** - Frameworked in *SvelteKit*
2. **Dynamic Component Test Sequencer** - Powered by *Playwright*
3. **Generative AI scripts** - leveraging *zod* schema'd structured output & *OpenAI*

## Quick Start Guide
### Setup
Ensure you have node, VSCode and the compatable Playwright plugin installed locally on your machine

1. Clone the project
2. Enter the project root directory
3. Create a .env file with the following
```
# OpenAI API Configuration
OPENAI_API_KEY=sk-proj-xxx

# Optional: Specify OpenAI model (defaults to gpt-4o-2024-08-06)
OPENAI_MODEL=gpt-5.1

# Optional: OpenAI organization (if you have multiple orgs)
OPENAI_ORG_ID=org-xxx
```
4. Install the node modules

``` 
npm install
```

5. Run the UI
```
npm run dev
```
*You can now visit http://localhost:5173/ and see the journeys*

6. Start the AI CLI script
```
npm run gen
```
7. Enter the name of a journey you would like to generate
```
Apply for a passport
```
```
Simple self assessment
```
```
Renew drivers license 
```
8. Visit http://localhost:5173/journey and review your new journey
9. Run test suite in UI mode
```
npx playwright test --ui e2e/journeys/Journeys.test.ts
```
10. Create a user flow test
- Open the testing tool in VSCode
- Navigate to The playwright acordion 
- Navigate to the Tools Subsection
- Click Record New
- When the automated browser window opens, enter the URL of your journey
- Carry out the user flow you want to test
- Stop the recording
- Return the VSCode and you should see a recorded test file 
- Move it to the /recordings directory
- In your terminal run the following
```
npx playwright test e2e/journeys/UserFlows.test.ts
```

### What just happened
1. You just executed a script to generate static json files that match a journey
2. SvelteKit had iterated over each step of the journey as a dynamic component in the UI based on the JSON array that was generated
3. Playwright has just iterated over each step of the journey and run the requisite component tests in order to validate it worked
4. You just recorded a user flow in the browser and generated a Playwright test