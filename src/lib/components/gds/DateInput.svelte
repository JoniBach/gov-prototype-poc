<script lang="ts">
	import { DateInputSchema } from '../schema.js';

	let raw = $props();
	const { config } = DateInputSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<fieldset class="govuk-fieldset" role="group" aria-describedby={config.hint ? `${config.id}-hint` : undefined}>
		<legend class="govuk-fieldset__legend {config.fieldset.legend.classes}">
			<h1 class="govuk-fieldset__heading">{config.fieldset.legend.text}</h1>
		</legend>
		{#if config.hint}
			<div id="{config.id}-hint" class="govuk-hint">{config.hint}</div>
		{/if}
		<div class="govuk-date-input" id={config.id}>
			<div class="govuk-date-input__item">
				<div class="govuk-form-group">
					<label class="govuk-label govuk-date-input__label" for="{config.id}-day">Day</label>
					<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="{config.id}-day" name="{config.name}-day" type="text" inputmode="numeric">
				</div>
			</div>
			<div class="govuk-date-input__item">
				<div class="govuk-form-group">
					<label class="govuk-label govuk-date-input__label" for="{config.id}-month">Month</label>
					<input class="govuk-input govuk-date-input__input govuk-input--width-2" id="{config.id}-month" name="{config.name}-month" type="text" inputmode="numeric">
				</div>
			</div>
			<div class="govuk-date-input__item">
				<div class="govuk-form-group">
					<label class="govuk-label govuk-date-input__label" for="{config.id}-year">Year</label>
					<input class="govuk-input govuk-date-input__input govuk-input--width-4" id="{config.id}-year" name="{config.name}-year" type="text" inputmode="numeric">
				</div>
			</div>
		</div>
	</fieldset>
</div>
