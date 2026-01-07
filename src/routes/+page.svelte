<script lang="ts">
	import GovUKPage from '$lib/components/prototype/GovUKPage.svelte';
	import MultiPage from '$lib/components/prototype/MultiPage.svelte';

	let pages = [
		{
			title: 'Personal Details',
			components: [
				{ component: 'TextInput', config: { placeholder: 'Enter your full name' } },
				{ component: 'DateInput', config: { placeholder: 'Date of birth' } },
				{ component: 'Radios', config: { placeholder: 'Select your gender' } }
			]
		},
		{
			title: 'Contact Information',
			components: [
				{ component: 'TextInput', config: { placeholder: 'Email address' } },
				{ component: 'TextInput', config: { placeholder: 'Phone number' } },
				{ component: 'Textarea', config: { placeholder: 'Home address' } }
			]
		},
		{
			title: 'Preferences',
			components: [
				{ component: 'Checkboxes', config: { placeholder: 'Select your interests' } },
				{ component: 'Select', config: { placeholder: 'Choose preferred contact method' } },
				{ component: 'InsetText', config: { placeholder: 'We will only contact you about important updates' } }
			]
		},
		{
			title: 'Documents',
			components: [
				{ component: 'FileUpload', config: { placeholder: 'Upload your ID' } },
				{ component: 'Details', config: { placeholder: 'What documents are accepted?' } },
				{ component: 'WarningText', config: { placeholder: 'Ensure all documents are clearly visible' } }
			]
		},
		{
			title: 'Review & Submit',
			components: [
				{ component: 'SummaryList', config: { placeholder: 'Review your answers' } },
				{ component: 'Button', config: { placeholder: 'Submit application' } }
			]
		}
	];
</script>

<MultiPage {pages} currentPage={0} />
