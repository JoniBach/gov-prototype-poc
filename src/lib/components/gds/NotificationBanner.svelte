<script lang="ts">
	import { NotificationBannerSchema } from '../schema.js';

	let raw = $props();
	const { config } = NotificationBannerSchema.parse(raw);
</script>

<h2>Notification banner</h2>
<p>{config.placeholder}</p>
