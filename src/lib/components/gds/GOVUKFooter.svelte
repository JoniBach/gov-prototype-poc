<script lang="ts">
	interface Props {
		props: {
			placeholder: string;
		};
	}

	let { props }: Props = $props();
</script>

<h2>GOV.UK footer</h2>
<p>{props.placeholder}</p>
