<script lang="ts">
	import GovUKPage from '$lib/components/prototype/GovUKPage.svelte';
	import { onMount } from 'svelte';

	let journeys = [];

	onMount(async () => {
		const response = await fetch('/journeys/index.json');
		journeys = await response.json();
	});
</script>

<GovUKPage title="Journeys">
	<ul class="govuk-list">
		{#each journeys as journey}
			<li>
				<a href="/journey/{journey.id}" class="govuk-link">{journey.name}</a>
				<p class="govuk-body-s">{journey.description}</p>
			</li>
		{/each}
	</ul>
</GovUKPage>
