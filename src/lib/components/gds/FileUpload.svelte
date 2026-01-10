<script lang="ts">
	import { FileUploadSchema } from '../schema.js';

	let { errors = [], ...raw } = $props();
	const { config } = FileUploadSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<label class="govuk-label" for={config.id}>{config.label.text}</label>
	<div class="govuk-drop-zone {errors.length > 0 ? 'govuk-drop-zone--error' : ''}" data-module="govuk-file-upload">
		<input class="govuk-file-upload" id={config.id} name={config.name} type="file">
	</div>
	{#if errors.length > 0}
		{#each errors as error}
			<p class="govuk-error-message">
				<span class="govuk-visually-hidden">Error:</span>
				{error}
			</p>
		{/each}
	{/if}
</div>
