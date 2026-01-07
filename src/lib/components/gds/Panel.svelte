<script lang="ts">
	import { PanelSchema } from '../schema.js';

	let raw = $props();
	const { config } = PanelSchema.parse(raw);
</script>

<h2>Panel</h2>
<p>{config.placeholder}</p>
