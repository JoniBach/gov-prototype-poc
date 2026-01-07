<script lang="ts">
	import { TextInputSchema } from '../schema.js';

	let raw = $props();
	const { config } = TextInputSchema.parse(raw);
</script>

<div class="govuk-form-group">
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
	<input class="govuk-input" id={config.id} name={config.name} type={config.type || 'text'}>
</div>
