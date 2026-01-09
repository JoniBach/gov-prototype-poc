<script lang="ts">
	import { BackLinkSchema } from '../schema.js';

	let { onBackLinkClicked, ...raw }: { onBackLinkClicked?: (data: { href: string }) => void; [key: string]: unknown } = $props();
	const { config } = BackLinkSchema.parse(raw);

	function handleClick(event: MouseEvent) {
		onBackLinkClicked?.({ href: config.href });
	}
</script>
<!-- href={config.href} -->
<a  class="govuk-back-link" onclick={handleClick}>{config.text}</a>