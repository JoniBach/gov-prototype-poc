<script lang="ts">
	import { SelectSchema } from '../schema.js';

	let raw = $props();
	const { config } = SelectSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<label class="govuk-label" for={config.id}>{config.label.text}</label>
	<select class="govuk-select" id={config.id} name={config.name}>
		{#each config.items as item}
			<option value={item.value} selected={item.selected}>{item.text}</option>
		{/each}
	</select>
</div>
