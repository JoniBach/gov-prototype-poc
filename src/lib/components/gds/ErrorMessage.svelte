<script lang="ts">
	import { ErrorMessageSchema } from '../schema.js';

	let raw = $props();

	const { config } = ErrorMessageSchema.parse(raw);
</script>



<div class="govuk-form-group {raw.errors.length > 0 ? 'govuk-form-group--error' : ''}">
	<fieldset
		class="govuk-fieldset"
		role="group"
	>
		<legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
			<h1 class="govuk-fieldset__heading">
				{config.label.text}
			</h1>
		</legend>
		<div class="govuk-hint">
			{config.hint.text}
		</div>
	{#if raw.errors.length > 0}
		{#each raw.errors as error}
			<p class="govuk-error-message">
				<span class="govuk-visually-hidden">Error:</span>
				{error.text}
			</p>
		{/each}
	{/if}
		{@render raw.children?.()}

	</fieldset>
</div>
