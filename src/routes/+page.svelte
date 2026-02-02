<script lang="ts">
	import GovUKPage from '$lib/components/prototype/GovUKPage.svelte';
</script>

<GovUKPage title="Home">
<div class='links'>
	<a href="/components" class="govuk-link">View components</a>
	<a href="/journey" class="govuk-link">View generated journeys</a>
</div>

</GovUKPage>

<style>
	.links {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>