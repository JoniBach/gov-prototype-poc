<script lang="ts">
	import { ComponentValidations, validationOptions } from '../validation';
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

	let errors = $state([]);

	function handleSubmit(event: Event, page: any, index: number) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const formDataOut: Record<string, string | string[]> = {};
		for (const [key, value] of formData.entries()) {
			const valueStr = value as string; // Assuming form inputs are strings, not files
			if (formDataOut[key]) {
				if (Array.isArray(formDataOut[key])) {
					(formDataOut[key] as string[]).push(valueStr);
				} else {
					formDataOut[key] = [formDataOut[key] as string, valueStr];
				}
			} else {
				formDataOut[key] = valueStr;
			}
		}
		// data = { ...data, [pages[currentPage].title]: Object.fromEntries(formData) };
		const components = page.components.map((c: any) => ({
			component: c.component,
			id: c.id,
			name: c.config.name,
			validationList: c?.config?.validation,
			validators: ComponentValidations[c.component],
		}));

		errors = components
			.filter((c: any) => c.validationList && c.validationList.length > 0 && c.validators)
			.map((c: any) => {
				const validator = c.validators[c.validationList[0]];
				if (typeof validator === 'function') {
					const value = formDataOut[c.name] || '';
					return validator(value);
				}
				return null;
			})
			.filter(Boolean)
			.filter((e: any) => e.message !== undefined);

		console.log({errors})
		console.log(formDataOut, components, index);

		data = { ...data, [pages[currentPage].title]: formDataOut };

		if (errors.length === 0) {
			currentPage++;
		}
	}

	function handleBackLinkClicked(event: CustomEvent<{ href: string }>) {
		console.log('backlink clicked');
		currentPage--;
	}

	$effect(() => {
		console.log($state.snapshot(data));
	});

	$effect(() => {
		if (pages.length > 0 && typeof window !== 'undefined' && (window as any).GOVUKFrontend) {
			(window as any).GOVUKFrontend.initAll();
		}
	});
</script>

{#each pages as page, index}
	<div class={`${index === currentPage ? 'show' : 'hide'}`}>
		<form id={page.title} onsubmit={(e) => handleSubmit(e, page, index)} >
			<GovUKPage title={page.title} errors={errors?.map((e: any) => ({ href: '#', text: e.message }))}>
				<Components components={page.components} onBackLinkClicked={handleBackLinkClicked} />
			</GovUKPage>
		</form>
	</div>
{/each}

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
