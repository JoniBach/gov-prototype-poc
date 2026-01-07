<script lang="ts">
	import { WarningTextSchema } from '../schema.js';

	let raw = $props();
	const { config } = WarningTextSchema.parse(raw);
</script>

<h2>Warning text</h2>
<p>{config.placeholder}</p>
