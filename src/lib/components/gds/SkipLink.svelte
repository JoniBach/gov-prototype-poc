<script lang="ts">
	import { SkipLinkSchema } from '../schema.js';

	let raw = $props();
	const { config } = SkipLinkSchema.parse(raw);
</script>

<a href={config.href} class="govuk-skip-link" data-module="govuk-skip-link">{config.text}</a>
