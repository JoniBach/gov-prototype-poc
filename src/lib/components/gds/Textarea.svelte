<script lang="ts">
	import { TextareaSchema } from '../schema.js';
	import ErrorMessage from './ErrorMessage.svelte';

	let { errors = [], ...raw } = $props();
	const { config } = TextareaSchema.parse(raw);

	let value = $state('');

	function handleInput(event: Event) {
		value = (event.target as HTMLTextAreaElement).value;
	}
</script>

<ErrorMessage
	config={{ hint: { text: config.hint?.text || '' }, label: { text: config.label.text } }}
	errors={errors.map((e) => ({ text: e }))}
>
	<textarea class="govuk-textarea" id={config.id} name={config.name} rows={config.rows || 5} {value} oninput={handleInput} aria-describedby={config.hint ? `${config.id}-hint ` : ''}></textarea>
</ErrorMessage>
