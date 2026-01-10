<script lang="ts">
	import { SelectSchema } from '../schema.js';

	let raw = $props();
	const { config } = SelectSchema.parse(raw);

	let value = $state('');

	function handleChange(event: Event) {
		value = (event.target as HTMLSelectElement).value;
	}
</script>

<div class="govuk-form-group">
	<label class="govuk-label" for={config.id}>{config.label.text}</label>
	<select class="govuk-select" id={config.id} name={config.name} {value} onchange={handleChange}>
		{#each config.items as item}
			<option value={item.value} selected={item.selected}>{item.text}</option>
		{/each}
	</select>
</div>
