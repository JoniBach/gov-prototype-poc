<script lang="ts">
	import { TextInputSchema } from '../schema.js';
	import { validateByRules } from '../validation.js';

	let raw = $props();
	const { config } = TextInputSchema.parse(raw);

	let value = $state('');
	let errorMessage = $state('');

	function handleInput(event: Event) {
		value = (event.target as HTMLInputElement).value;
		const result = validateByRules(config.validation || [], value);
		errorMessage = result.message || '';
	}
</script>

<div class="govuk-form-group {errorMessage ? 'govuk-form-group--error' : ''}">
	{#if config.label.isPageHeading}
		<h1 class="govuk-label-wrapper">
			<label class="govuk-label {config.label.classes || ''}" for={config.id}>
				{config.label.text}
			</label>
		</h1>
	{:else}
		<label class="govuk-label {config.label.classes || ''}" for={config.id}>
			{config.label.text}
		</label>
	{/if}
	{#if errorMessage}
		<p class="govuk-error-message" id="{config.id}-error">
			<span class="govuk-visually-hidden">Error:</span>
			{errorMessage}
		</p>
	{/if}
	<input class="govuk-input {errorMessage ? 'govuk-input--error' : ''}" id={config.id} name={config.name} type={config.type || 'text'} {value} on:input={handleInput} aria-describedby={errorMessage ? `${config.id}-error` : undefined}>
</div>
