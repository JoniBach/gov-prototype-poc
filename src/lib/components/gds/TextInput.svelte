<script lang="ts">
	import { TextInputSchema } from '../schema.js';
	import { ComponentValidations, runValidations } from '../validation.js';
	import type { ValidationResult } from '../validation.js';
	import ErrorMessage from './ErrorMessage.svelte';

	let { ...raw } = $props();
	const { config } = TextInputSchema.parse(raw);

	let value = $state('');

	const validation = ComponentValidations.TextInput;

	let errors = $state<string[]>([]);

	function handleBlur(event: Event) {
		value = (event.target as HTMLInputElement).value;
		errors = runValidations(validation, config.validation, value);
	}

	$inspect(errors);

	let ariaDescribedBy = $derived(
		[config.hint ? `${config.id}-hint` : null, errors.length > 0 ? `${config.id}-error` : null]
			.filter(Boolean)
			.join(' ') || undefined
	);
</script>

<ErrorMessage
	config={{ hint: { text: config.hint?.text || '' }, label: { text: config.label?.text || '' } }}
	errors={errors.map((e) => ({ text: e }))}
>
	<input
		class="govuk-input {errors.length > 0 ? 'govuk-input--error' : ''}"
		id={config.id}
		name={config.name}
		type="text"
		aria-describedby={ariaDescribedBy}
		{value}
		onblur={handleBlur}
	/>
</ErrorMessage>
