<script lang="ts">
	import Components from "./Components.svelte";
	import GovUKPage from "./GovUKPage.svelte";
	let { pages, currentPage: initialCurrentPage }: { pages: { title: string; components: any[] }[]; currentPage: number } = $props();

	let currentPage = $state(initialCurrentPage);

	let buttonText = $derived(
		currentPage === 0 ? 'Start' : currentPage < pages.length - 1 ? 'Next' : 'Finish'
	);
</script>

{#if pages[currentPage]}
	<GovUKPage title={pages[currentPage].title}>
		<Components components={pages[currentPage].components} />
		{#if currentPage > 0 || currentPage === pages.length - 1}
			<button onclick={() => currentPage--}>Previous</button>
		{/if}
		<button onclick={() => { if (currentPage < pages.length - 1) currentPage++; else currentPage = 0; }}>{buttonText}</button>
	</GovUKPage>
{/if}