<script lang="ts">
	import { SkipLinkSchema } from '../schema.js';

	let raw = $props();
	const { config } = SkipLinkSchema.parse(raw);
</script>

<h2>Skip link</h2>
<p>{config.placeholder}</p>
