<script lang="ts">
	import { TabsSchema } from '../schema.js';

	let raw = $props();
	const { config } = TabsSchema.parse(raw);
</script>

<div class="govuk-tabs" data-module="govuk-tabs">
	<h2 class="govuk-tabs__title">{config.title}</h2>
	<ul class="govuk-tabs__list">
		{#each config.items as item, i}
			<li class="govuk-tabs__list-item {i === 0 ? 'govuk-tabs__list-item--selected' : ''}">
				<a class="govuk-tabs__tab" href="#{item.id}">{item.label}</a>
			</li>
		{/each}
	</ul>
	{#each config.items as item, i}
		<div class="govuk-tabs__panel {i > 0 ? 'govuk-tabs__panel--hidden' : ''}" id={item.id}>
			{@html item.content}
		</div>
	{/each}
</div>
