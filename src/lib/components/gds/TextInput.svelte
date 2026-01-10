<script lang="ts">
	import { TextInputSchema } from '../schema.js';
	import ErrorMessage from './ErrorMessage.svelte';

	let { errors = [], ...raw } = $props();
	const { config } = TextInputSchema.parse(raw);

	let value = $state('');

	function handleBlur(event: Event) {
		value = (event.target as HTMLInputElement).value;
	}

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
