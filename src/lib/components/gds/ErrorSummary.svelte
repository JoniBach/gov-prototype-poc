<script lang="ts">
	interface config {
		config: {
			placeholder: string;
		};
	}

	let { config }: config = $props();
</script>

<h2>Error summary</h2>
<p>{config.placeholder}</p>
