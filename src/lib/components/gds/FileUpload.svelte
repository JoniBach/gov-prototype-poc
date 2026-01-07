<script lang="ts">
	import { FileUploadSchema } from '../schema.js';

	let raw = $props();
	const { config } = FileUploadSchema.parse(raw);
</script>

<div class="govuk-form-group">
	<label class="govuk-label" for={config.id}>{config.label.text}</label>
	<div class="govuk-drop-zone" data-module="govuk-file-upload">
		<input class="govuk-file-upload" id={config.id} name={config.name} type="file">
	</div>
</div>
