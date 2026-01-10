<script lang="ts">
	import { SelectSchema } from '../schema.js';
	import ErrorMessage from './ErrorMessage.svelte';

	let { errors = [], ...raw } = $props();
	const { config } = SelectSchema.parse(raw);

	let value = $state('');

	function handleChange(event: Event) {
		value = (event.target as HTMLSelectElement).value;
	}
</script>

<ErrorMessage
	config={{ hint: { text: config.hint?.text || '' }, label: { text: (config.label as { text: string }).text || '' } }}
	errors={errors.map((e) => ({ text: e }))}
>
	<select class="govuk-select" id={config.id} name={config.name} {value} onchange={handleChange}>
		{#each config.items as item}
			<option value={item.value} selected={item.selected}>{item.text}</option>
		{/each}
	</select>
</ErrorMessage>
