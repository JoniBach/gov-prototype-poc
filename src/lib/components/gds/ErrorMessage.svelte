<script lang="ts">
	import { ErrorMessageSchema } from '../schema.js';

	let raw = $props();
	const { config } = ErrorMessageSchema.parse(raw);
</script>

<p class="govuk-error-message">
	<span class="govuk-visually-hidden">{config.visuallyHiddenText}:</span>
	{config.text}
</p>
