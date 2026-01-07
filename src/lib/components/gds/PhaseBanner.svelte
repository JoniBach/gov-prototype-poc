<script lang="ts">
	import { PhaseBannerSchema } from '../schema.js';

	let raw = $props();
	const { config } = PhaseBannerSchema.parse(raw);
</script>

<h2>Phase banner</h2>
<p>{config.placeholder}</p>
