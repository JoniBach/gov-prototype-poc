<script lang="ts">
	import { ErrorMessageSchema } from '../schema.js';

	let raw = $props();
	const { config } = ErrorMessageSchema.parse(raw);
</script>

<h2>Error message</h2>
<p>{config.placeholder}</p>
