<script lang="ts">
	import { PasswordInputSchema } from '../schema.js';

	let raw = $props();
	const { config } = PasswordInputSchema.parse(raw);
</script>

<h2>Password input</h2>
<p>{config.placeholder}</p>
