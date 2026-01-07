<script lang="ts">
	import { ServiceNavigationSchema } from '../schema.js';

	let raw = $props();
	const { config } = ServiceNavigationSchema.parse(raw);
</script>

<h2>Service navigation</h2>
<p>{config.placeholder}</p>
