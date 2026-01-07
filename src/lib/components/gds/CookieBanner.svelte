<script lang="ts">
	import { CookieBannerSchema } from '../schema.js';

	let raw = $props();
	const { config } = CookieBannerSchema.parse(raw);
</script>

<h2>Cookie banner</h2>
<p>{config.placeholder}</p>
