<script lang="ts">
	import { PaginationSchema } from '../schema.js';

	let raw = $props();
	const { config } = PaginationSchema.parse(raw);
</script>

<h2>Pagination</h2>
<p>{config.placeholder}</p>
