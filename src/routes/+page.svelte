<script lang="ts">
	import { onMount } from 'svelte';
	import GovUKPage from '$lib/components/prototype/GovUKPage.svelte';
	import Accordion from '$lib/components/gds/Accordion.svelte';
	import Component from '$lib/components/prototype/Component.svelte';

</script>

<GovUKPage title="GOV.UK Design System Examples">
<!-- <Accordion config={{placeholder: 'test'}}	/> -->

<Component component={{component: 'Accordion', config: {placeholder: 'test'}}} />
</GovUKPage>
