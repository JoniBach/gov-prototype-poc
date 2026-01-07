<script lang="ts">
	import { TableSchema } from '../schema.js';

	let raw = $props();
	const { config } = TableSchema.parse(raw);
</script>

<h2>Table</h2>
<p>{config.placeholder}</p>
