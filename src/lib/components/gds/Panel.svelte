<script lang="ts">
	import { PanelSchema } from '../schema.js';

	let raw = $props();
	const { config } = PanelSchema.parse(raw);
</script>

<div class="govuk-panel govuk-panel--confirmation">
	<h1 class="govuk-panel__title">{config.titleText}</h1>
	<div class="govuk-panel__body">{@html config.html}</div>
</div>
