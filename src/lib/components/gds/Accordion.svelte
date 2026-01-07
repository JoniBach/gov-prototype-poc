<script lang="ts">
	import { AccordionSchema } from '../schema.js';

	let raw = $props();
	const { config } = AccordionSchema.parse(raw);
</script>

<div class="govuk-accordion" data-module="govuk-accordion" id={config.id}>
	{#each config.sections as section, index}
		<div class="govuk-accordion__section" class:govuk-accordion__section--expanded={section.expanded}>
			<div class="govuk-accordion__section-header">
				<h2 class="govuk-accordion__section-heading">
					<span
						class="govuk-accordion__section-button"
						id="{config.id}-heading-{index + 1}"
						aria-expanded={section.expanded ? 'true' : 'false'}
					>
						{section.heading}
					</span>
				</h2>
			</div>
			<div
				id="{config.id}-content-{index + 1}"
				class="govuk-accordion__section-content"
				aria-labelledby="{config.id}-heading-{index + 1}"
			>
				{@html section.content}
			</div>
		</div>
	{/each}
</div>