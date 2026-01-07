<script lang="ts">
	import { PhaseBannerSchema } from '../schema.js';

	let raw = $props();
	const { config } = PhaseBannerSchema.parse(raw);
</script>

<div class="govuk-phase-banner">
	<p class="govuk-phase-banner__content">
		<strong class="govuk-tag govuk-phase-banner__content__tag">{config.tag.text}</strong>
		<span class="govuk-phase-banner__text">{@html config.html}</span>
	</p>
</div>
