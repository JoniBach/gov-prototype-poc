<script lang="ts">
	import { TableSchema } from '../schema.js';

	let raw = $props();
	const { config } = TableSchema.parse(raw);
</script>

<table class="govuk-table">
	<caption class="govuk-table__caption {config.captionClasses || ''}">{config.caption}</caption>
	{#if config.head && config.head.length > 0}
		<thead class="govuk-table__head">
			<tr class="govuk-table__row">
				{#each config.head as header}
					<th scope="col" class="govuk-table__header">
						{header.text}
						{@html header.html || ''}
					</th>
				{/each}
			</tr>
		</thead>
	{/if}
	<tbody class="govuk-table__body">
		{#each config.rows as row}
			<tr class="govuk-table__row">
				{#each row as cell, i}
					{#if config.firstCellIsHeader && i === 0}
						<th scope="row" class="govuk-table__header">
							{cell.text}
							{@html cell.html || ''}
						</th>
					{:else}
						<td class="govuk-table__cell">
							{cell.text}
							{@html cell.html || ''}
						</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
