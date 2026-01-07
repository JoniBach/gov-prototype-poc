<script lang="ts">
	import { CheckboxesSchema } from '../schema.js';

	let raw = $props();
	const { config } = CheckboxesSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<fieldset class="govuk-fieldset" aria-describedby={config.hint ? `${config.name}-hint` : undefined}>
		<legend class="govuk-fieldset__legend {config.fieldset.legend.classes}">
			<h1 class="govuk-fieldset__heading">{config.fieldset.legend.text}</h1>
		</legend>
		{#if config.hint}
			<div id="{config.name}-hint" class="govuk-hint">{config.hint}</div>
		{/if}
		<div class="govuk-checkboxes" data-module="govuk-checkboxes">
			{#each config.items as item, index}
				<div class="govuk-checkboxes__item">
					<input class="govuk-checkboxes__input" id={item.id || `${config.name}${index > 0 ? '-' + (index + 1) : ''}`} name={config.name} type="checkbox" value={item.value} checked={item.checked}>
					<label class="govuk-label govuk-checkboxes__label" for={item.id || `${config.name}${index > 0 ? '-' + (index + 1) : ''}`}>{item.text}</label>
				</div>
			{/each}
		</div>
	</fieldset>
</div>
