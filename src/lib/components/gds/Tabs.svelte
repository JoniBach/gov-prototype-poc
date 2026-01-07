<script lang="ts">
	import { TabsSchema } from '../schema.js';

	let raw = $props();
	const { config } = TabsSchema.parse(raw);
</script>

<h2>Tabs</h2>
<p>{config.placeholder}</p>
