<script lang="ts">
	import { InsetTextSchema } from '../schema.js';

	let raw = $props();
	const { config } = InsetTextSchema.parse(raw);
</script>

<h2>Inset text</h2>
<p>{config.placeholder}</p>
