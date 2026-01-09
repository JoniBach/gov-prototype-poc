<script lang="ts">
	import Components from './Components.svelte';
	import GovUKPage from './GovUKPage.svelte';
	let {
		pages,
		currentPage: initialCurrentPage
	}: { pages: { title: string; components: any[] }[]; currentPage: number } = $props();

	let currentPage = $state(initialCurrentPage);
	let data = $state<Record<string, Record<string, unknown>>>({});

	let buttonText = $derived(
		currentPage === 0 ? 'Start' : currentPage < pages.length - 1 ? 'Next' : 'Finish'
	);

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		console.log(Object.fromEntries(formData));
		// data = { ...data, [pages[currentPage].title]: Object.fromEntries(formData) };

		data = { ...data, ...Object.fromEntries(formData) };

		currentPage++;
	}

	function handleBackLinkClicked(event: CustomEvent<{ href: string }>) {
		console.log('backlink clicked');
		currentPage--;
	}

	$effect(() => {
		console.log($state.snapshot(data));
	});
</script>


<form onsubmit={handleSubmit} novalidate>
	{#each pages as page, index}
		<div class={`${index === currentPage ? 'show' : 'hide'}`}>
			<GovUKPage title={page.title}>
				<Components components={page.components} onBackLinkClicked={handleBackLinkClicked} />
			</GovUKPage>
		</div>
	{/each}
</form>

<style>
	.hide {
		display: none;
	}
	.show {
		display: block;
	}
		:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'GDS Transport', arial, sans-serif;
	}
</style>

