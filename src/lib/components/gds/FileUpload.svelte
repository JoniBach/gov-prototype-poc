<script lang="ts">
	import { FileUploadSchema } from '../schema.js';

	let raw = $props();
	const { config } = FileUploadSchema.parse(raw);
</script>

<h2>File upload</h2>
<p>{config.placeholder}</p>
