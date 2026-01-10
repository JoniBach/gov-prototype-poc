<script lang="ts">
	import { RadiosSchema } from '../schema.js';

	let { errors = [], ...raw } = $props();
	const { config } = RadiosSchema.parse(raw);
</script>

<div class="govuk-form-group {errors.length > 0 ? 'govuk-form-group--error' : ''}">
	<fieldset class="govuk-fieldset">
		<legend class="govuk-fieldset__legend {config.fieldset.legend.classes}">
			<h1 class="govuk-fieldset__heading">{config.fieldset.legend.text}</h1>
		</legend>
				{#if errors.length > 0}
			{#each errors as error}
				<p class="govuk-error-message">
					<span class="govuk-visually-hidden">Error:</span>
					{error}
				</p>
			{/each}
		{/if}
		<div class="govuk-radios" data-module="govuk-radios">
			{#each config.items as item, index}
				<div class="govuk-radios__item">
					<input class="govuk-radios__input" id={item.id || `${config.name}${index > 0 ? '-' + (index + 1) : ''}`} name={config.name} type="radio" value={item.value} checked={item.checked}>
					<label class="govuk-label govuk-radios__label" for={item.id || `${config.name}${index > 0 ? '-' + (index + 1) : ''}`}>{item.text}</label>
				</div>
			{/each}
		</div>

	</fieldset>
</div>
