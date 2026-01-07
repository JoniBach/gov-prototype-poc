<script lang="ts">
	import { GOVUKHeaderSchema } from '../schema.js';

	let raw = $props();
	const { config } = GOVUKHeaderSchema.parse(raw);
</script>

<h2>GOV.UK header</h2>
<p>{config.placeholder}</p>
