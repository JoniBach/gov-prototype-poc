<script lang="ts">
	import { ButtonSchema } from '../schema.js';

	let raw = $props();
	const { config } = ButtonSchema.parse(raw);
</script>

<h2>Button</h2>
<p>{config.placeholder}</p>
