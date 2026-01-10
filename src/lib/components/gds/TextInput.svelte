<script lang="ts">
	import { TextInputSchema } from '../schema.js';

	let { errors = [], ...raw } = $props();
	const { config } = TextInputSchema.parse(raw);

	let value = $state('');

	function handleBlur(event: Event) {
		value = (event.target as HTMLInputElement).value;
	}

	let ariaDescribedBy = $derived(
		[config.hint ? `${config.id}-hint` : null, errors.length > 0 ? `${config.id}-error` : null]
			.filter(Boolean)
			.join(' ') || undefined
	);
</script>

<div class="govuk-form-group">
	<label class="govuk-label{config.label.classes ? ` ${config.label.classes}` : ''}" for={config.id}>{config.label?.text}</label>
	{#if config.hint}
		<div id="{config.id}-hint" class="govuk-hint">{config.hint}</div>
	{/if}
	<input
		class="govuk-input {errors.length > 0 ? 'govuk-input--error' : ''}"
		id={config.id}
		name={config.name}
		type={config.type || 'text'}
		aria-describedby={ariaDescribedBy}
		{value}
		onblur={handleBlur}
	/>
	{#if errors.length > 0}
		{#each errors as error}
			<p class="govuk-error-message">
				<span class="govuk-visually-hidden">Error:</span>
				{error}
			</p>
		{/each}
	{/if}
</div>
