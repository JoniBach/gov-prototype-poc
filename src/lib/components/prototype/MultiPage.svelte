<script lang="ts">
	import Components from "./Components.svelte";
	import GovUKPage from "./GovUKPage.svelte";
	let { pages, currentPage: initialCurrentPage }: { pages: { title: string; components: any[] }[]; currentPage: number } = $props();

	let currentPage = $state(initialCurrentPage);

	let buttonText = $derived(
		currentPage === 0 ? 'Start' : currentPage < pages.length - 1 ? 'Next' : 'Finish'
	);

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		console.log(Object.fromEntries(formData));

		currentPage++;
	}

	function handleBackLinkClicked(event: CustomEvent<{ href: string }>) {
	console.log('backlink clicked')
		currentPage--;
	}
</script>

{#if pages[currentPage]}
	<GovUKPage title={pages[currentPage].title}>
		<form onsubmit={handleSubmit}>
			<Components components={pages[currentPage].components} onBackLinkClicked={handleBackLinkClicked} />
		</form>
		{#if currentPage > 0 || currentPage === pages.length - 1}
			<button onclick={() => currentPage--}>Previous</button>
		{/if}
		<button onclick={() => { if (currentPage < pages.length - 1) currentPage++; else currentPage = 0; }}>{buttonText}</button>
	</GovUKPage>
{/if}