<script lang="ts">
	import Component from './Component.svelte';
	import { ComponentsSchema } from '../schema.js';

	let { onBackLinkClicked, ...rest }: { onBackLinkClicked?: any; [key: string]: unknown } = $props();
	let components = $derived(ComponentsSchema.parse(rest.components));
</script>

{#each components as comp}
	<div class='component-{comp.id}'>
		<Component component={comp} onBackLinkClicked={onBackLinkClicked} />
	</div>
{/each}