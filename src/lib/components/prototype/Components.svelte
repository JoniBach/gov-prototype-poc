<script lang="ts">
	import Component from './Component.svelte';
	import { ComponentsSchema } from '../schema.js';

	let raw = $props();
	let components = $derived(ComponentsSchema.parse(raw.components));
</script>

{#each components as comp}
	<Component component={comp} />
{/each}