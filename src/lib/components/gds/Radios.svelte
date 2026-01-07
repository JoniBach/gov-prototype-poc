<script lang="ts">
	import { RadiosSchema } from '../schema.js';

	let raw = $props();
	const { config } = RadiosSchema.parse(raw);
</script>

<h2>Radios</h2>
<p>{config.placeholder}</p>
