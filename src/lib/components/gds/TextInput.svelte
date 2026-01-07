<script lang="ts">
	import { TextInputSchema } from '../schema.js';

	let raw = $props();
	const { config } = TextInputSchema.parse(raw);
</script>

<h2>Text input</h2>
<p>{config.placeholder}</p>
