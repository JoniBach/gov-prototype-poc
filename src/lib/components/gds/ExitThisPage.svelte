<script lang="ts">
	import { ExitThisPageSchema } from '../schema.js';

	let raw = $props();
	const { config } = ExitThisPageSchema.parse(raw);
</script>

<h2>Exit this page</h2>
<p>{config.placeholder}</p>
