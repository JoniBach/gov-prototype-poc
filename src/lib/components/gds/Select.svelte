<script lang="ts">
	import { SelectSchema } from '../schema.js';

	let raw = $props();
	const { config } = SelectSchema.parse(raw);
</script>

<h2>Select</h2>
<p>{config.placeholder}</p>
