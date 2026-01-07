<script lang="ts">
	import { RadiosSchema } from '../schema.js';

	let raw = $props();
	const { config } = RadiosSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<fieldset class="govuk-fieldset">
		<legend class="govuk-fieldset__legend {config.fieldset.legend.classes}">
			<h1 class="govuk-fieldset__heading">{config.fieldset.legend.text}</h1>
		</legend>
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
