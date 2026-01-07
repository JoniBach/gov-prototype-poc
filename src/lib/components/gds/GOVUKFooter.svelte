<script lang="ts">
	import { GOVUKFooterSchema } from '../schema.js';

	let raw = $props();
	const { config } = GOVUKFooterSchema.parse(raw);
</script>

<h2>GOV.UK footer</h2>
<p>{config.placeholder}</p>
