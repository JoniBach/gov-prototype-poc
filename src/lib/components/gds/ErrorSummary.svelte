<script lang="ts">
	import { ErrorSummarySchema } from '../schema.js';

	let raw = $props();
	const config = $derived(ErrorSummarySchema.parse(raw).config);
</script>

<div class="govuk-error-summary" data-module="govuk-error-summary">
	<div role="alert">
		<h2 class="govuk-error-summary__title">{config.titleText}</h2>
		<div class="govuk-error-summary__body">
			<ul class="govuk-list govuk-error-summary__list">
				{#each config.errorList as error}
					<li>
						<a href={error.href}>{error.text}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
