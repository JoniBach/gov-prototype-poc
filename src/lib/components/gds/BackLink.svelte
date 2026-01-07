<script lang="ts">
	import { BackLinkSchema } from '../schema.js';

	let raw = $props();
	const { config } = BackLinkSchema.parse(raw);
</script>

<a href={config.href} class="govuk-back-link">{config.text}</a>
