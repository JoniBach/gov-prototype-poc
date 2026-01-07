<script lang="ts">
	import { ErrorSummarySchema } from '../schema.js';

	let raw = $props();
	const { config } = ErrorSummarySchema.parse(raw);
</script>

<h2>Error summary</h2>
<p>{config.placeholder}</p>
