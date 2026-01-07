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

	let pages = [
		{
			title: 'Components',
			components: [
				{ component: 'Accordion', config: AccordionConfig[0] },
				{ component: 'BackLink', config: BackLinkConfig[0] },
				{ component: 'Breadcrumbs', config: BreadcrumbsConfig[0] },
				{ component: 'Button', config: ButtonConfig[0] },
				{ component: 'CharacterCount', config: CharacterCountConfig[0] },
				{ component: 'Checkboxes', config: CheckboxesConfig[0] },
				{ component: 'CookieBanner', config: CookieBannerConfig[0] },
				{ component: 'DateInput', config: DateInputConfig[0] },
				{ component: 'Details', config: DetailsConfig[0] },
				{ component: 'ErrorMessage', config: ErrorMessageConfig[0] },
				{ component: 'ErrorSummary', config: ErrorSummaryConfig[0] },
				{ component: 'ExitThisPage', config: ExitThisPageConfig[0] },
				{ component: 'Fieldset', config: FieldsetConfig[0] },
				{ component: 'FileUpload', config: FileUploadConfig[0] },
				{ component: 'GOVUKFooter', config: GOVUKFooterConfig[0] },
				{ component: 'GOVUKHeader', config: GOVUKHeaderConfig[0] },
				{ component: 'InsetText', config: InsetTextConfig[0] },
				{ component: 'NotificationBanner', config: NotificationBannerConfig[0] },
				{ component: 'Pagination', config: PaginationConfig[0] },
				{ component: 'Panel', config: PanelConfig[0] },
				{ component: 'PasswordInput', config: PasswordInputConfig[0] },
				{ component: 'PhaseBanner', config: PhaseBannerConfig[0] },
				{ component: 'Radios', config: RadiosConfig[0] },
				{ component: 'Select', config: SelectConfig[0] },
				{ component: 'ServiceNavigation', config: ServiceNavigationConfig[0] },
				{ component: 'SkipLink', config: SkipLinkConfig[0] },
				{ component: 'SummaryList', config: SummaryListConfig[0] },
				{ component: 'Table', config: TableConfig[0] },
				{ component: 'Tabs', config: TabsConfig[0] },
				{ component: 'Tag', config: TagConfig[0] },
				{ component: 'TaskList', config: TaskListConfig[0] },
				{ component: 'TextInput', config: TextInputConfig[0] },
				{ component: 'Textarea', config: TextareaConfig[0] },
				{ component: 'Typography', config: TypographyConfig[0] },
				{ component: 'WarningText', config: WarningTextConfig[0] },
			]
		}
	]
</script>

<MultiPage {pages} currentPage={0} />
