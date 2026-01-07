<script lang="ts">
	import { PasswordInputSchema } from '../schema.js';

	let raw = $props();
	const { config } = PasswordInputSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<label class="govuk-label" for={config.id}>{config.label.text}</label>
	<input class="govuk-input govuk-password-input__input" id={config.id} name={config.name} type="password">
</div>
