<script lang="ts">
	import { DateInputSchema } from '../schema.js';

	let raw = $props();
	const { config } = DateInputSchema.parse(raw);
</script>

<h2>Date input</h2>
<p>{config.placeholder}</p>
