<script lang="ts">
	import { InsetTextSchema } from '../schema.js';

	let raw = $props();
	const { config } = InsetTextSchema.parse(raw);
</script>

<div class="govuk-inset-text">{config.text}</div>
