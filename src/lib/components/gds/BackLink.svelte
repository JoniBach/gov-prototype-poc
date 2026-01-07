<script lang="ts">
	import { BackLinkSchema } from '../schema.js';

	let raw = $props();
	const { config } = BackLinkSchema.parse(raw);
</script>

<h2>Back link</h2>
<p>{config.placeholder}</p>
