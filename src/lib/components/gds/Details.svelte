<script lang="ts">
	import { DetailsSchema } from '../schema.js';

	let raw = $props();
	const { config } = DetailsSchema.parse(raw);
</script>

<details class="govuk-details">
	<summary class="govuk-details__summary">
		<span class="govuk-details__summary-text">{config.summaryText}</span>
	</summary>
	<div class="govuk-details__text">{config.text}</div>
</details>
