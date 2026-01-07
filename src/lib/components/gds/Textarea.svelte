<script lang="ts">
	import { TextareaSchema } from '../schema.js';

	let raw = $props();
	const { config } = TextareaSchema.parse(raw);
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
	{#if config.hint}
		<div id="{config.id}-hint" class="govuk-hint">
			{config.hint.text}
		</div>
	{/if}
	<textarea class="govuk-textarea" id={config.id} name={config.name} rows={config.rows || 5} aria-describedby={config.hint ? `${config.id}-hint` : undefined}></textarea>
</div>
