<script lang="ts">
	import { CharacterCountSchema } from '../schema.js';
	import ErrorMessage from './ErrorMessage.svelte';

	let { errors = [], ...raw } = $props();
	const { config } = CharacterCountSchema.parse(raw);
</script>

<ErrorMessage
	config={{ hint: { text: config.hint || '' }, label: { text: config.label } }}
	errors={errors.map((e) => ({ text: e }))}
>
	<textarea class="govuk-textarea govuk-js-character-count" id={config.id} name={config.name} rows={config.rows} aria-describedby="{config.id}-info{(config.hint ? ' ' + config.id + '-hint' : '')}"></textarea>
	<div id="{config.id}-info" class="govuk-hint govuk-character-count__message">You can enter up to {config.maxlength} characters</div>
</ErrorMessage>
