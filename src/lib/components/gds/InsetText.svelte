<script lang="ts">
	import { InsetTextSchema } from '../schema.js';
	import { marked } from 'marked';

	let raw = $props();
	const { config } = InsetTextSchema.parse(raw);

	const html = typeof config.text === 'string' ? marked(config.text) : '';
</script>

<div class="govuk-inset-text">{@html html}</div>
