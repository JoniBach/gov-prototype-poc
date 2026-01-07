<script lang="ts">
	import { CharacterCountSchema } from '../schema.js';

	let raw = $props();
	const { config } = CharacterCountSchema.parse(raw);
</script>

<h2>Character count</h2>
<p>{config.placeholder}</p>
