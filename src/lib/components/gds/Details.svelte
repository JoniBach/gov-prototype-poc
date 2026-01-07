<script lang="ts">
	import { DetailsSchema } from '../schema.js';

	let raw = $props();
	const { config } = DetailsSchema.parse(raw);
</script>

<h2>Details</h2>
<p>{config.placeholder}</p>
