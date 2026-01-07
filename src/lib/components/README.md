# Components documentation

## Requirements
To implement a new GOV.UK Design System component, follow these steps:

1. **Update the Schema**: Add a new schema in `schema.ts` for the component. Define the config object with the necessary fields. For example, for a simple component with placeholder text, use `z.object({ config: z.object({ placeholder: z.string() }) })`. For more complex components like Accordion, define the specific fields like id and sections array.

2. **Implement the Component**: Create a new Svelte component in `src/lib/components/gds/ComponentName.svelte`. Import the schema, parse the config prop using the schema, and render the GOV.UK HTML structure based on the official documentation. Include `data-module` attributes for JavaScript functionality if applicable. Use `class:govuk-accordion__section--expanded` for initial expanded states if supported.

3. **Mark as Done**: Update the checklist in the Reference section below by changing `[ ]` to `[x]` for the implemented component.

4. **Create Mock Config**: Create a JSON file in `src/lib/components/mock/config/ComponentName.json` containing an array with a single config object as an example. For simple components, use `[{ "placeholder": "example text" }]`. For complex components, provide the full config structure wrapped in an array.

5. **Integrate in Page**: Import the JSON config in `src/routes/+page.svelte`, and add the component to the pages array using `config: ConfigName[0]`.

Each component should have a single prop called `config`. The schema for configs is defined in `schema.ts` - update this file when adding new components to ensure type safety and validation.

## Reference

- [x] [Accordion](https://design-system.service.gov.uk/components/accordion/)
- [x] [Back link](https://design-system.service.gov.uk/components/back-link/)
- [x] [Breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/)
- [x] [Button](https://design-system.service.gov.uk/components/button/)
- [x] [Character count](https://design-system.service.gov.uk/components/character-count/)
- [x] [Checkboxes](https://design-system.service.gov.uk/components/checkboxes/)
- [x] [Cookie banner](https://design-system.service.gov.uk/components/cookie-banner/)
- [x] [Date input](https://design-system.service.gov.uk/components/date-input/)
- [x] [Details](https://design-system.service.gov.uk/components/details/)
- [x] [Error message](https://design-system.service.gov.uk/components/error-message/)
- [x] [Error summary](https://design-system.service.gov.uk/components/error-summary/)
- [x] [Exit this page](https://design-system.service.gov.uk/components/exit-this-page/)
- [x] [Fieldset](https://design-system.service.gov.uk/components/fieldset/)
- [x] [File upload](https://design-system.service.gov.uk/components/file-upload/)
- [x] [GOV.UK footer](https://design-system.service.gov.uk/components/footer/)
- [x] [GOV.UK header](https://design-system.service.gov.uk/components/header/)
- [x] [Inset text](https://design-system.service.gov.uk/components/inset-text/)
- [x] [Notification banner](https://design-system.service.gov.uk/components/notification-banner/)
- [x] [Pagination](https://design-system.service.gov.uk/components/pagination/)
- [x] [Panel](https://design-system.service.gov.uk/components/panel/)
- [x] [Password input](https://design-system.service.gov.uk/components/password-input/)
- [x] [Phase banner](https://design-system.service.gov.uk/components/phase-banner/)
- [x] [Radios](https://design-system.service.gov.uk/components/radios/)
- [x] [Select](https://design-system.service.gov.uk/components/select/)
- [x] [Service navigation](https://design-system.service.gov.uk/components/service-navigation/)
- [x] [Skip link](https://design-system.service.gov.uk/components/skip-link/)
- [x] [Summary list](https://design-system.service.gov.uk/components/summary-list/)
- [x] [Table](https://design-system.service.gov.uk/components/table/)
- [x] [Tabs](https://design-system.service.gov.uk/components/tabs/)
- [x] [Tag](https://design-system.service.gov.uk/components/tag/)
- [x] [Task list](https://design-system.service.gov.uk/components/task-list/)
- [x] [Text input](https://design-system.service.gov.uk/components/text-input/)
- [x] [Textarea](https://design-system.service.gov.uk/components/textarea/)
- [x] [Warning text](https://design-system.service.gov.uk/components/warning-text/)
- [x] [Typography](https://design-system.service.gov.uk/styles/typography/)