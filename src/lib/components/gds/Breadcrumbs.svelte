<script lang="ts">
	import { BreadcrumbsSchema } from '../schema.js';

	let raw = $props();
	const { config } = BreadcrumbsSchema.parse(raw);
</script>

<h2>Breadcrumbs</h2>
<p>{config.placeholder}</p>
