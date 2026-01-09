import mockConfigs from '../src/lib/components/mock/config/Accordion.json' with { type: 'json' };
import testAccordion from './components/Accordion';
import mockBreadcrumbs from '../src/lib/components/mock/config/Breadcrumbs.json' with { type: 'json' };
import testBreadcrumbs from './components/Breadcrumbs';
import mockCharacterCount from '../src/lib/components/mock/config/CharacterCount.json' with { type: 'json' };
import testCharacterCount from './components/CharacterCount';
import mockCheckboxes from '../src/lib/components/mock/config/Checkboxes.json' with { type: 'json' };
import testCheckboxes from './components/Checkboxes';
import mockCookieBanner from '../src/lib/components/mock/config/CookieBanner.json' with { type: 'json' };
import testCookieBanner from './components/CookieBanner';
import mockDateInput from '../src/lib/components/mock/config/DateInput.json' with { type: 'json' };
import testDateInput from './components/DateInput';
import mockDetails from '../src/lib/components/mock/config/Details.json' with { type: 'json' };
import testDetails from './components/Details';
import mockFieldset from '../src/lib/components/mock/config/Fieldset.json' with { type: 'json' };
import testFieldset from './components/Fieldset';
import mockFileUpload from '../src/lib/components/mock/config/FileUpload.json' with { type: 'json' };
import testFileUpload from './components/FileUpload';
import mockInsetText from '../src/lib/components/mock/config/InsetText.json' with { type: 'json' };
import testInsetText from './components/InsetText';
import mockPanel from '../src/lib/components/mock/config/Panel.json' with { type: 'json' };
import testPanel from './components/Panel';
import mockPasswordInput from '../src/lib/components/mock/config/PasswordInput.json' with { type: 'json' };
import testPasswordInput from './components/PasswordInput';
import mockPhaseBanner from '../src/lib/components/mock/config/PhaseBanner.json' with { type: 'json' };
import testPhaseBanner from './components/PhaseBanner';
import mockRadios from '../src/lib/components/mock/config/Radios.json' with { type: 'json' };
import testRadios from './components/Radios';
import mockSelect from '../src/lib/components/mock/config/Select.json' with { type: 'json' };
import testSelect from './components/Select';
import mockServiceNavigation from '../src/lib/components/mock/config/ServiceNavigation.json' with { type: 'json' };
import testServiceNavigation from './components/ServiceNavigation';
import mockSkipLink from '../src/lib/components/mock/config/SkipLink.json' with { type: 'json' };
import testSkipLink from './components/SkipLink';
import mockSummaryList from '../src/lib/components/mock/config/SummaryList.json' with { type: 'json' };
import testSummaryList from './components/SummaryList';
import mockTable from '../src/lib/components/mock/config/Table.json' with { type: 'json' };
import testTable from './components/Table';
import mockTabs from '../src/lib/components/mock/config/Tabs.json' with { type: 'json' };
import testTabs from './components/Tabs';
import mockTag from '../src/lib/components/mock/config/Tag.json' with { type: 'json' };
import testTag from './components/Tag';
import mockTaskList from '../src/lib/components/mock/config/TaskList.json' with { type: 'json' };
import testTaskList from './components/TaskList';
import mockTextInput from '../src/lib/components/mock/config/TextInput.json' with { type: 'json' };
import testTextInput from './components/TextInput';
import mockTextarea from '../src/lib/components/mock/config/Textarea.json' with { type: 'json' };
import testTextarea from './components/Textarea';
import mockTypography from '../src/lib/components/mock/config/Typography.json' with { type: 'json' };
import testTypography from './components/Typography';
import mockWarningText from '../src/lib/components/mock/config/WarningText.json' with { type: 'json' };
import testWarningText from './components/WarningText';
import mockBackLink from '../src/lib/components/mock/config/BackLink.json' with { type: 'json' };
import testBackLink from './components/BackLink';
import mockButton from '../src/lib/components/mock/config/Button.json' with { type: 'json' };
import testButton from './components/Button';
import mockErrorMessage from '../src/lib/components/mock/config/ErrorMessage.json' with { type: 'json' };
import testErrorMessage from './components/ErrorMessage';
import mockErrorSummary from '../src/lib/components/mock/config/ErrorSummary.json' with { type: 'json' };
import testErrorSummary from './components/ErrorSummary';
import mockGOVUKFooter from '../src/lib/components/mock/config/GOVUKFooter.json' with { type: 'json' };
import testGOVUKFooter from './components/GOVUKFooter';
import mockGOVUKHeader from '../src/lib/components/mock/config/GOVUKHeader.json' with { type: 'json' };
import testGOVUKHeader from './components/GOVUKHeader';
import mockPagination from '../src/lib/components/mock/config/Pagination.json' with { type: 'json' };
import testPagination from './components/Pagination';
import mockExitThisPage from '../src/lib/components/mock/config/ExitThisPage.json' with { type: 'json' };
import testExitThisPage from './components/ExitThisPage';
import mockNotificationBanner from '../src/lib/components/mock/config/NotificationBanner.json' with { type: 'json' };
import testNotificationBanner from './components/NotificationBanner';

export const components = {
	Accordion: testAccordion,
	Breadcrumbs: testBreadcrumbs,
	CharacterCount: testCharacterCount,
	Checkboxes: testCheckboxes,
	CookieBanner: testCookieBanner,
	DateInput: testDateInput,
	Details: testDetails,
	Fieldset: testFieldset,
	FileUpload: testFileUpload,
	InsetText: testInsetText,
	Panel: testPanel,
	PasswordInput: testPasswordInput,
	PhaseBanner: testPhaseBanner,
	Radios: testRadios,
	Select: testSelect,
	ServiceNavigation: testServiceNavigation,
	SkipLink: testSkipLink,
	SummaryList: testSummaryList,
	Table: testTable,
	Tabs: testTabs,
	Tag: testTag,
	TaskList: testTaskList,
	TextInput: testTextInput,
	Textarea: testTextarea,
	Typography: testTypography,
	WarningText: testWarningText,
	BackLink: testBackLink,
	Button: testButton,
	ErrorMessage: testErrorMessage,
	ErrorSummary: testErrorSummary,
	GOVUKFooter: testGOVUKFooter,
	GOVUKHeader: testGOVUKHeader,
	Pagination: testPagination,
	ExitThisPage: testExitThisPage,
	NotificationBanner: testNotificationBanner,
}

export const componentConfigs: Record<string, any> = {
	Accordion: mockConfigs[0],
	Breadcrumbs: mockBreadcrumbs[0],
	CharacterCount: mockCharacterCount[0],
	Checkboxes: mockCheckboxes[0],
	CookieBanner: mockCookieBanner[0],
	DateInput: mockDateInput[0],
	Details: mockDetails[0],
	Fieldset: mockFieldset[0],
	FileUpload: mockFileUpload[0],
	InsetText: mockInsetText[0],
	Panel: mockPanel[0],
	PasswordInput: mockPasswordInput[0],
	PhaseBanner: mockPhaseBanner[0],
	Radios: mockRadios[0],
	Select: mockSelect[0],
	ServiceNavigation: mockServiceNavigation[0],
	SkipLink: mockSkipLink[0],
	SummaryList: mockSummaryList[0],
	Table: mockTable[0],
	Tabs: mockTabs[0],
	Tag: mockTag[0],
	TaskList: mockTaskList[0],
	TextInput: mockTextInput[0],
	Textarea: mockTextarea[0],
	Typography: mockTypography[0],
	WarningText: mockWarningText[0],
	BackLink: mockBackLink[0],
	Button: mockButton[0],
	ErrorMessage: mockErrorMessage[0],
	ErrorSummary: mockErrorSummary[0],
	GOVUKFooter: mockGOVUKFooter[0],
	GOVUKHeader: mockGOVUKHeader[0],
	Pagination: mockPagination[0],
	ExitThisPage: mockExitThisPage[0],
	NotificationBanner: mockNotificationBanner[0],
}