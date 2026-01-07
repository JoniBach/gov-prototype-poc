<script lang="ts">
	import { TagSchema } from '../schema.js';

	let raw = $props();
	const { config } = TagSchema.parse(raw);
</script>

<strong class="govuk-tag {config.classes || ''}">{config.text}</strong>
