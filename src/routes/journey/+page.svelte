<script lang="ts">
	import GovUKPage from '$lib/components/prototype/GovUKPage.svelte';
	import { onMount } from 'svelte';

	let journeys = $state()

	onMount(async () => {
		const response = await fetch('/journeys/index.json');
		journeys = await response.json();

		const promises = journeys.map(async (journey) => {
			const pageResponse = await fetch(`/journeys/${journey.id}.json`);
			journey.pages = await pageResponse.json();
		});
		await Promise.all(promises);

		console.log(journeys);
	});
</script>

<GovUKPage title="Journeys">
	<ul class="govuk-list">
		{#each journeys as journey}
			<li>
				<a href="/journey/{journey.id}" class="govuk-link">{journey.name}</a>
				<p class="govuk-body-s">{journey.description}</p>
				<details class="govuk-details">
					<summary class="govuk-details__summary">
						<span class="govuk-details__summary-text">View pages</span>
					</summary>
					<div class="govuk-details__text">
						<div class="pages govuk-body-xs">
							{#each journey.pages as page}
								<p class="crumb">{page.title}</p>
							{/each}
						</div>
					</div>
				</details>





			</li>
		{/each}
	</ul>
</GovUKPage>

<style>
	.pages {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.crumb {
		margin: 0 2px;
	}
	.crumb::after {
		content: '>';
		margin-left: 2px;
	}
	.crumb:last-child::after {
		content: '';
	}
</style>