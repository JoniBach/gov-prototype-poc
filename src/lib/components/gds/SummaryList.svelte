<script lang="ts">
	import { SummaryListSchema } from '../schema.js';

	let raw = $props();
	const { config } = SummaryListSchema.parse(raw);
</script>

<dl class="govuk-summary-list">
	{#each config.rows as row}
		<div class="govuk-summary-list__row">
			<dt class="govuk-summary-list__key">{row.key.text}</dt>
			<dd class="govuk-summary-list__value">
				{row.value.text || ''}
				{@html row.value.html || ''}
			</dd>
		</div>
	{/each}
</dl>
