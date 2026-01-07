<script lang="ts">
	import { TagSchema } from '../schema.js';

	let raw = $props();
	const { config } = TagSchema.parse(raw);
</script>

<h2>Tag</h2>
<p>{config.placeholder}</p>
