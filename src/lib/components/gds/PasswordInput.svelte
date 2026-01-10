<script lang="ts">
	import { PasswordInputSchema } from '../schema.js';
	import ErrorMessage from './ErrorMessage.svelte';

	let { errors = [], ...raw } = $props();
	const { config } = PasswordInputSchema.parse(raw);
</script>

<ErrorMessage
	config={{ hint: { text: '' }, label: { text: config.label.text } }}
	errors={errors.map((e) => ({ text: e }))}
>
	<input class="govuk-input govuk-password-input__input" id={config.id} name={config.name} type="password">
</ErrorMessage>
