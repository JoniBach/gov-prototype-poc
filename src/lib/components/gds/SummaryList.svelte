<script lang="ts">
	import { SummaryListSchema } from '../schema.js';

	let raw = $props();
	const { config } = SummaryListSchema.parse(raw);
</script>

<h2>Summary list</h2>
<p>{config.placeholder}</p>
