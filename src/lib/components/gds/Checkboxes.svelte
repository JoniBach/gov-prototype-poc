<script lang="ts">
	import { CheckboxesSchema } from '../schema.js';

	let raw = $props();
	const { config } = CheckboxesSchema.parse(raw);
</script>

<h2>Checkboxes</h2>
<p>{config.placeholder}</p>
