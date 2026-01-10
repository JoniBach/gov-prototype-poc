<script lang="ts">
	import Component from './Component.svelte';
	import { ComponentsSchema } from '../schema.js';

	let { onBackLinkClicked, errors, ...rest }: { onBackLinkClicked?: any; errors?: any[]; [key: string]: unknown } = $props();
	let components = $derived(ComponentsSchema.parse(rest.components));
</script>

{#each components as comp}
	<div class='component-{comp.id}'>
		<Component component={comp} onBackLinkClicked={onBackLinkClicked} errors={errors?.filter((e: any) => e.id === comp.id).map((e: any) => e.message) || []} />
	</div>
{/each}