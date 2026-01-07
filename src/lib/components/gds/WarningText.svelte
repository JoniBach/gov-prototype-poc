<script lang="ts">
	import { WarningTextSchema } from '../schema.js';

	let raw = $props();
	const { config } = WarningTextSchema.parse(raw);
</script>

<div class="govuk-warning-text">
	<span class="govuk-warning-text__icon" aria-hidden="true">!</span>
	<strong class="govuk-warning-text__text">
		<span class="govuk-visually-hidden">{config.iconFallbackText || 'Warning'}</span>
		{config.text}
	</strong>
</div>
