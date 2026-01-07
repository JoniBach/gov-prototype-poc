<script lang="ts">
	import { FieldsetSchema } from '../schema.js';

	let raw = $props();
	const { config } = FieldsetSchema.parse(raw);
</script>

<h2>Fieldset</h2>
<p>{config.placeholder}</p>
