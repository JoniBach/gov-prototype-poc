<script lang="ts">
	import { SelectSchema } from '../schema.js';
	import { validateByRules } from '../validation.js';

	let raw = $props();
	const { config } = SelectSchema.parse(raw);

	let value = $state('');
	let errorMessage = $state('');

	function handleChange(event: Event) {
		value = (event.target as HTMLSelectElement).value;
		const result = validateByRules(config.validation || [], value);
		errorMessage = result.message || '';
	}
</script>

<div class="govuk-form-group {errorMessage ? 'govuk-form-group--error' : ''}">
	<label class="govuk-label" for={config.id}>{config.label.text}</label>
	{#if errorMessage}
		<p class="govuk-error-message" id="{config.id}-error">
			<span class="govuk-visually-hidden">Error:</span>
			{errorMessage}
		</p>
	{/if}
	<select class="govuk-select {errorMessage ? 'govuk-select--error' : ''}" id={config.id} name={config.name} {value} on:change={handleChange} aria-describedby={errorMessage ? `${config.id}-error` : undefined}>
		{#each config.items as item}
			<option value={item.value} selected={item.selected}>{item.text}</option>
		{/each}
	</select>
</div>
