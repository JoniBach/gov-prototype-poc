<script lang="ts">
	import { TextareaSchema } from '../schema.js';

	let raw = $props();
	const { config } = TextareaSchema.parse(raw);

	let value = $state('');

	function handleInput(event: Event) {
		value = (event.target as HTMLTextAreaElement).value;
	}
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
	<textarea class="govuk-textarea" id={config.id} name={config.name} rows={config.rows || 5} {value} oninput={handleInput} aria-describedby={config.hint ? `${config.id}-hint ` : ''}></textarea>
</div>
