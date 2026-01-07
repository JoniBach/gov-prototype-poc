<script lang="ts">
	import { FieldsetSchema } from '../schema.js';

	let raw = $props();
	const { config } = FieldsetSchema.parse(raw);
</script>

<fieldset class="govuk-fieldset">
	<legend class="govuk-fieldset__legend {config.legend.classes}">
		{#if config.legend.isPageHeading}
			<h1 class="govuk-fieldset__heading">{config.legend.text}</h1>
		{:else}
			{config.legend.text}
		{/if}
	</legend>
</fieldset>
