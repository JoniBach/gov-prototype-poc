<script lang="ts">
	import { page } from '$app/stores';
	import { fetchJsonFile } from '$lib/ai/files';
	import GovUKPage from '$lib/components/prototype/GovUKPage.svelte';
	import MultiPage from '$lib/components/prototype/MultiPage.svelte';
	import { onMount } from 'svelte';

	let journeyId = $page.params.id;

	let pages = [];
	let currentPage = 0;

	onMount(async () => {
		const response = await fetch(`/journeys/${journeyId}.json`);
		pages = await response.json();
	});
</script>

{#if pages.length > 0}
	<MultiPage pages={pages} currentPage={currentPage}/>
{/if}
