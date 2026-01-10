<script lang="ts">
	import { TextareaSchema } from '../schema.js';
	import { validateByRules } from '../validation.js';

	let raw = $props();
	const { config } = TextareaSchema.parse(raw);

	let value = $state('');
	let errorMessage = $state('');

	function handleInput(event: Event) {
		value = (event.target as HTMLTextAreaElement).value;
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
	{#if config.hint}
		<div id="{config.id}-hint" class="govuk-hint">
			{config.hint.text}
		</div>
	{/if}
	{#if errorMessage}
		<p class="govuk-error-message" id="{config.id}-error">
			<span class="govuk-visually-hidden">Error:</span>
			{errorMessage}
		</p>
	{/if}
	<textarea class="govuk-textarea {errorMessage ? 'govuk-textarea--error' : ''}" id={config.id} name={config.name} rows={config.rows || 5} {value} oninput={handleInput} aria-describedby={(config.hint ? `${config.id}-hint ` : '') + (errorMessage ? `${config.id}-error` : '')}></textarea>
</div>
