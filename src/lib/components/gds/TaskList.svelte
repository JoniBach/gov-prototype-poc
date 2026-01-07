<script lang="ts">
	import { TaskListSchema } from '../schema.js';

	let raw = $props();
	const { config } = TaskListSchema.parse(raw);
</script>

<h2>Task list</h2>
<p>{config.placeholder}</p>
