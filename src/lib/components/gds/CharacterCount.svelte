<script lang="ts">
	import { CharacterCountSchema } from '../schema.js';

	let raw = $props();
	const { config } = CharacterCountSchema.parse(raw);
</script>

<div class="govuk-form-group govuk-character-count" data-module="govuk-character-count" data-maxlength={config.maxlength}>
	<h1 class="govuk-label-wrapper">
		<label class="govuk-label govuk-label--l" for={config.id}>{config.label}</label>
	</h1>
	{#if config.hint}
		<div id="{config.id}-hint" class="govuk-hint">{config.hint}</div>
	{/if}
	<textarea class="govuk-textarea govuk-js-character-count" id={config.id} name={config.name} rows={config.rows} aria-describedby="{config.id}-info{(config.hint ? ' ' + config.id + '-hint' : '')}"></textarea>
	<div id="{config.id}-info" class="govuk-hint govuk-character-count__message">You can enter up to {config.maxlength} characters</div>
</div>
