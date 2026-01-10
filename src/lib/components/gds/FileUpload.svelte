<script lang="ts">
	import { FileUploadSchema } from '../schema.js';
	import ErrorMessage from './ErrorMessage.svelte';

	let { errors = [], ...raw } = $props();
	const { config } = FileUploadSchema.parse(raw);
</script>

<ErrorMessage
	config={{ hint: { text: '' }, label: { text: config.label.text } }}
	errors={errors.map((e) => ({ text: e }))}
>
	<div class="govuk-drop-zone" data-module="govuk-file-upload">
		<input class="govuk-file-upload" id={config.id} name={config.name} type="file">
	</div>
</ErrorMessage>
