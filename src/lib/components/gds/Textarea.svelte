<script lang="ts">
	import { TextareaSchema } from '../schema.js';

	let raw = $props();
	const { config } = TextareaSchema.parse(raw);
</script>

<h2>Textarea</h2>
<p>{config.placeholder}</p>
