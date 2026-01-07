<script lang="ts">
	import { ButtonSchema } from '../schema.js';

	let raw = $props();
	const { config } = ButtonSchema.parse(raw);
</script>

{#if config.element === "a"}
	<a href={config.href} class="govuk-button" data-module="govuk-button">{config.text}</a>
{:else if config.element === "input"}
	<input type="submit" class="govuk-button" data-module="govuk-button" value={config.text} disabled={config.disabled}>
{:else}
	<button type="submit" class="govuk-button" data-module="govuk-button" disabled={config.disabled}>{config.text}</button>
{/if}
