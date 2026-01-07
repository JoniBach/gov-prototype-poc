<script lang="ts">
	import { AccordionSchema } from '../schema.js';

	let raw = $props();
	const { config } = AccordionSchema.parse(raw);
</script>

<h2>Accordion</h2>
<p>{config.placeholder}</p>