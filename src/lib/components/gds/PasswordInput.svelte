<script lang="ts">
	import { PasswordInputSchema } from '../schema.js';

	let { errors = [], ...raw } = $props();
	const { config } = PasswordInputSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<label class="govuk-label" for={config.id}>{config.label.text}</label>
	<input class="govuk-input govuk-password-input__input {errors.length > 0 ? 'govuk-input--error' : ''}" id={config.id} name={config.name} type="password">
	{#if errors.length > 0}
		{#each errors as error}
			<p class="govuk-error-message">
				<span class="govuk-visually-hidden">Error:</span>
				{error}
			</p>
		{/each}
	{/if}
</div>
