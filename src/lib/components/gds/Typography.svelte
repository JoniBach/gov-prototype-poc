<script lang="ts">
	import { TypographySchema } from '../schema.js';

	let raw = $props();
	let { config } = TypographySchema.parse(raw);

	const isHeading = config.variant.startsWith('heading-');
	const level = isHeading ? parseInt(config.variant.split('-')[1]) || 1 : 1;
</script>

{#if isHeading}
	{#if level === 1}
		<h1 class="govuk-{config.variant}">{config.text}</h1>
	{:else if level === 2}
		<h2 class="govuk-{config.variant}">{config.text}</h2>
	{:else if level === 3}
		<h3 class="govuk-{config.variant}">{config.text}</h3>
	{:else if level === 4}
		<h4 class="govuk-{config.variant}">{config.text}</h4>
	{:else if level === 5}
		<h5 class="govuk-{config.variant}">{config.text}</h5>
	{:else}
		<h6 class="govuk-{config.variant}">{config.text}</h6>
	{/if}
{:else}
	<p class="govuk-{config.variant}">{config.text}</p>
{/if}
