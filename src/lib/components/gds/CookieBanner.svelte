<script lang="ts">
	import { CookieBannerSchema } from '../schema.js';

	let raw = $props();
	const { config } = CookieBannerSchema.parse(raw);
</script>

{#if !config.hidden}
	<div class="govuk-cookie-banner" data-nosnippet role="region" aria-label={config.ariaLabel}>
		{#each config.messages as message}
			<div class="govuk-cookie-banner__message govuk-width-container">
				<div class="govuk-grid-row">
					<div class="govuk-grid-column-two-thirds">
						<h2 class="govuk-cookie-banner__heading govuk-heading-m">{message.headingText}</h2>
						<div class="govuk-cookie-banner__content">
							{@html message.content}
						</div>
					</div>
				</div>
				<div class="govuk-button-group">
					{#each message.actions as action}
						{#if action.type === "button"}
							<button type="submit" name={action.name} value={action.value} class="govuk-button" data-module="govuk-button">{action.text}</button>
						{:else}
							<a class="govuk-link" href={action.href}>{action.text}</a>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}
