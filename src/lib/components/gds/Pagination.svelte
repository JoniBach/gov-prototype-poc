<script lang="ts">
	import { PaginationSchema } from '../schema.js';

	let raw = $props();
	const { config } = PaginationSchema.parse(raw);
</script>

<nav class="govuk-pagination" aria-label="Pagination">
	{#if config.previous}
		<div class="govuk-pagination__prev">
			<a class="govuk-link govuk-pagination__link" href={config.previous.href} rel="prev">
				<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
					<path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
				</svg>
				<span class="govuk-pagination__link-title">{config.previous.text}<span class="govuk-visually-hidden"> page</span></span>
			</a>
		</div>
	{/if}
	{#if config.items}
		<ul class="govuk-pagination__list">
			{#each config.items as item}
				<li class="govuk-pagination__item {item.current ? 'govuk-pagination__item--current' : ''}">
					<a class="govuk-link govuk-pagination__link" href={item.href} aria-label="Page {item.number}" aria-current={item.current ? 'page' : undefined}>{item.number}</a>
				</li>
			{/each}
		</ul>
	{/if}
	{#if config.next}
		<div class="govuk-pagination__next">
			<a class="govuk-link govuk-pagination__link" href={config.next.href} rel="next">
				<span class="govuk-pagination__link-title">{config.next.text}<span class="govuk-visually-hidden"> page</span></span>
				<svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
					<path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
				</svg>
			</a>
		</div>
	{/if}
</nav>
