<script lang="ts">
	import GovUKPage from '$lib/components/prototype/GovUKPage.svelte';
	import MultiPage from '$lib/components/prototype/MultiPage.svelte';
	import AccordionConfig from '$lib/components/mock/config/Accordion.json';
	import BackLinkConfig from '$lib/components/mock/config/BackLink.json';
	import BreadcrumbsConfig from '$lib/components/mock/config/Breadcrumbs.json';
	import ButtonConfig from '$lib/components/mock/config/Button.json';
	import CharacterCountConfig from '$lib/components/mock/config/CharacterCount.json';
	import CheckboxesConfig from '$lib/components/mock/config/Checkboxes.json';
	import CookieBannerConfig from '$lib/components/mock/config/CookieBanner.json';
	import DateInputConfig from '$lib/components/mock/config/DateInput.json';
	import DetailsConfig from '$lib/components/mock/config/Details.json';
	import ErrorMessageConfig from '$lib/components/mock/config/ErrorMessage.json';
	import ErrorSummaryConfig from '$lib/components/mock/config/ErrorSummary.json';
	import ExitThisPageConfig from '$lib/components/mock/config/ExitThisPage.json';
	import FieldsetConfig from '$lib/components/mock/config/Fieldset.json';
	import FileUploadConfig from '$lib/components/mock/config/FileUpload.json';
	import GOVUKFooterConfig from '$lib/components/mock/config/GOVUKFooter.json';
	import GOVUKHeaderConfig from '$lib/components/mock/config/GOVUKHeader.json';
	import InsetTextConfig from '$lib/components/mock/config/InsetText.json';
	import NotificationBannerConfig from '$lib/components/mock/config/NotificationBanner.json';
	import PaginationConfig from '$lib/components/mock/config/Pagination.json';
	import PanelConfig from '$lib/components/mock/config/Panel.json';
	import PasswordInputConfig from '$lib/components/mock/config/PasswordInput.json';
	import PhaseBannerConfig from '$lib/components/mock/config/PhaseBanner.json';
	import RadiosConfig from '$lib/components/mock/config/Radios.json';
	import SelectConfig from '$lib/components/mock/config/Select.json';
	import ServiceNavigationConfig from '$lib/components/mock/config/ServiceNavigation.json';
	import SkipLinkConfig from '$lib/components/mock/config/SkipLink.json';
	import SummaryListConfig from '$lib/components/mock/config/SummaryList.json';
	import TableConfig from '$lib/components/mock/config/Table.json';
	import TabsConfig from '$lib/components/mock/config/Tabs.json';
	import TagConfig from '$lib/components/mock/config/Tag.json';
	import TaskListConfig from '$lib/components/mock/config/TaskList.json';
	import TextInputConfig from '$lib/components/mock/config/TextInput.json';
	import TextareaConfig from '$lib/components/mock/config/Textarea.json';
	import TypographyConfig from '$lib/components/mock/config/Typography.json';
	import WarningTextConfig from '$lib/components/mock/config/WarningText.json';
	import ComponentShowcase from '$lib/components/prototype/ComponentShowcase.svelte';

	let components = [
		{ id: 'Accordion', component: 'Accordion', config: AccordionConfig[0] },
		{ id: 'BackLink', component: 'BackLink', config: BackLinkConfig[0] },
		{ id: 'Breadcrumbs', component: 'Breadcrumbs', config: BreadcrumbsConfig[0] },
		{ id: 'Button', component: 'Button', config: ButtonConfig[0] },
		{ id: 'CharacterCount', component: 'CharacterCount', config: CharacterCountConfig[0] },
		{ id: 'Checkboxes', component: 'Checkboxes', config: CheckboxesConfig[0] },
		{ id: 'CookieBanner', component: 'CookieBanner', config: CookieBannerConfig[0] },
		{ id: 'DateInput', component: 'DateInput', config: DateInputConfig[0] },
		{ id: 'Details', component: 'Details', config: DetailsConfig[0] },
		{ id: 'ErrorMessage', component: 'ErrorMessage', config: ErrorMessageConfig[0] },
		{ id: 'ErrorSummary', component: 'ErrorSummary', config: ErrorSummaryConfig[0] },
		{ id: 'ExitThisPage', component: 'ExitThisPage', config: ExitThisPageConfig[0] },
		{ id: 'Fieldset', component: 'Fieldset', config: FieldsetConfig[0] },
		{ id: 'FileUpload', component: 'FileUpload', config: FileUploadConfig[0] },
		{ id: 'GOVUKFooter', component: 'GOVUKFooter', config: GOVUKFooterConfig[0] },
		{ id: 'GOVUKHeader', component: 'GOVUKHeader', config: GOVUKHeaderConfig[0] },
		{ id: 'InsetText', component: 'InsetText', config: InsetTextConfig[0] },
		{
			id: 'NotificationBanner',
			component: 'NotificationBanner',
			config: NotificationBannerConfig[0]
		},
		{ id: 'Pagination', component: 'Pagination', config: PaginationConfig[0] },
		{ id: 'Panel', component: 'Panel', config: PanelConfig[0] },
		{ id: 'PasswordInput', component: 'PasswordInput', config: PasswordInputConfig[0] },
		{ id: 'PhaseBanner', component: 'PhaseBanner', config: PhaseBannerConfig[0] },
		{ id: 'Radios', component: 'Radios', config: RadiosConfig[0] },
		{ id: 'Select', component: 'Select', config: SelectConfig[0] },
		{ id: 'ServiceNavigation', component: 'ServiceNavigation', config: ServiceNavigationConfig[0] },
		{ id: 'SkipLink', component: 'SkipLink', config: SkipLinkConfig[0] },
		{ id: 'SummaryList', component: 'SummaryList', config: SummaryListConfig[0] },
		{ id: 'Table', component: 'Table', config: TableConfig[0] },
		{ id: 'Tabs', component: 'Tabs', config: TabsConfig[0] },
		{ id: 'Tag', component: 'Tag', config: TagConfig[0] },
		{ id: 'TaskList', component: 'TaskList', config: TaskListConfig[0] },
		{ id: 'TextInput', component: 'TextInput', config: TextInputConfig[0] },
		{ id: 'Textarea', component: 'Textarea', config: TextareaConfig[0] },
		{ id: 'Typography', component: 'Typography', config: TypographyConfig[0] },
		{ id: 'WarningText', component: 'WarningText', config: WarningTextConfig[0] }
	];
</script>

<GovUKPage title="Components">
	<ComponentShowcase {components} />
</GovUKPage>
