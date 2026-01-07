<script lang="ts">
	interface Props {
		props: {
			placeholder: string;
		};
	}

	let { props }: Props = $props();
</script>

<h2>Fieldset</h2>
<p>{props.placeholder}</p>
