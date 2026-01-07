<script lang="ts">
	import { BreadcrumbsSchema } from '../schema.js';

	let raw = $props();
	const { config } = BreadcrumbsSchema.parse(raw);
</script>

<nav class="govuk-breadcrumbs" aria-label="Breadcrumb">
	<ol class="govuk-breadcrumbs__list">
		{#each config.items as item}
			<li class="govuk-breadcrumbs__list-item">
				{#if item.href}
					<a class="govuk-breadcrumbs__link" href={item.href}>{item.text}</a>
				{:else}
					{item.text}
				{/if}
			</li>
		{/each}
	</ol>
</nav>
