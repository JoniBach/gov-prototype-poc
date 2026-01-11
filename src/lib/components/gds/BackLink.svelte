<script lang="ts">
	import { BackLinkSchema } from '../schema.js';

	let { onBackLinkClicked, ...raw }: { onBackLinkClicked?: (data: { href: string }) => void; [key: string]: unknown } = $props();
	const { config } = BackLinkSchema.parse(raw);

	function handleClick(event: MouseEvent) {
		event.preventDefault();
		onBackLinkClicked?.({ href: config.href });
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onBackLinkClicked?.({ href: config.href });
		}
	}
</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<a href="#" class="govuk-back-link" onclick={handleClick} onkeydown={handleKeydown} role="button" tabindex="0">{config.text}</a>