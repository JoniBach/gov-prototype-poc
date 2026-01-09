<script lang="ts">
	import Accordion from '../gds/Accordion.svelte';
	import BackLink from '../gds/BackLink.svelte';
	import Breadcrumbs from '../gds/Breadcrumbs.svelte';
	import Button from '../gds/Button.svelte';
	import CharacterCount from '../gds/CharacterCount.svelte';
	import Checkboxes from '../gds/Checkboxes.svelte';
	import CookieBanner from '../gds/CookieBanner.svelte';
	import DateInput from '../gds/DateInput.svelte';
	import Details from '../gds/Details.svelte';
	import ErrorMessage from '../gds/ErrorMessage.svelte';
	import ErrorSummary from '../gds/ErrorSummary.svelte';
	import ExitThisPage from '../gds/ExitThisPage.svelte';
	import Fieldset from '../gds/Fieldset.svelte';
	import FileUpload from '../gds/FileUpload.svelte';
	import GOVUKFooter from '../gds/GOVUKFooter.svelte';
	import GOVUKHeader from '../gds/GOVUKHeader.svelte';
	import InsetText from '../gds/InsetText.svelte';
	import NotificationBanner from '../gds/NotificationBanner.svelte';
	import Pagination from '../gds/Pagination.svelte';
	import Panel from '../gds/Panel.svelte';
	import PasswordInput from '../gds/PasswordInput.svelte';
	import PhaseBanner from '../gds/PhaseBanner.svelte';
	import Radios from '../gds/Radios.svelte';
	import Select from '../gds/Select.svelte';
	import ServiceNavigation from '../gds/ServiceNavigation.svelte';
	import SkipLink from '../gds/SkipLink.svelte';
	import SummaryList from '../gds/SummaryList.svelte';
	import Table from '../gds/Table.svelte';
	import Tabs from '../gds/Tabs.svelte';
	import Tag from '../gds/Tag.svelte';
	import TaskList from '../gds/TaskList.svelte';
	import TextInput from '../gds/TextInput.svelte';
	import Textarea from '../gds/Textarea.svelte';
	import WarningText from '../gds/WarningText.svelte';
	import { ComponentSchema } from '../schema';

	let { component, ...rest }: { component: { component: string; config: any }; [key: string]: unknown } = $props();

	let Component = $derived.by(() => {
		const validated = ComponentSchema.parse(component);
		switch (validated.component as string) {
			case 'Accordion':
				return Accordion;
			case 'BackLink':
				return BackLink;
			case 'Breadcrumbs':
				return Breadcrumbs;
			case 'Button':
				return Button;
			case 'CharacterCount':
				return CharacterCount;
			case 'Checkboxes':
				return Checkboxes;
			case 'CookieBanner':
				return CookieBanner;
			case 'DateInput':
				return DateInput;
			case 'Details':
				return Details;
			case 'ErrorMessage':
				return ErrorMessage;
			case 'ErrorSummary':
				return ErrorSummary;
			case 'ExitThisPage':
				return ExitThisPage;
			case 'Fieldset':
				return Fieldset;
			case 'FileUpload':
				return FileUpload;
			case 'GOVUKFooter':
				return GOVUKFooter;
			case 'GOVUKHeader':
				return GOVUKHeader;
			case 'InsetText':
				return InsetText;
			case 'NotificationBanner':
				return NotificationBanner;
			case 'Pagination':
				return Pagination;
			case 'Panel':
				return Panel;
			case 'PasswordInput':
				return PasswordInput;
			case 'PhaseBanner':
				return PhaseBanner;
			case 'Radios':
				return Radios;
			case 'Select':
				return Select;
			case 'ServiceNavigation':
				return ServiceNavigation;
			case 'SkipLink':
				return SkipLink;
			case 'SummaryList':
				return SummaryList;
			case 'Table':
				return Table;
			case 'Tabs':
				return Tabs;
			case 'Tag':
				return Tag;
			case 'TaskList':
				return TaskList;
			case 'TextInput':
				return TextInput;
			case 'Textarea':
				return Textarea;
			case 'WarningText':
				return WarningText;
			default:
				return null;
		}
	});
</script>

{#if Component}
	<svelte:component this={Component} config={component.config} {...rest} />
{/if}