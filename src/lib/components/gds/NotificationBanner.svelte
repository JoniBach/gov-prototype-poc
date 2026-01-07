<script lang="ts">
	import { NotificationBannerSchema } from '../schema.js';

	let raw = $props();
	const { config } = NotificationBannerSchema.parse(raw);
</script>

<div class="govuk-notification-banner" role="region" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">
	<div class="govuk-notification-banner__header">
		<h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">{config.titleText}</h2>
	</div>
	<div class="govuk-notification-banner__content">
		<p class="govuk-notification-banner__heading">{config.text}</p>
	</div>
</div>
