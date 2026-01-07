import { z } from 'zod';

export const AccordionSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const BackLinkSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const BreadcrumbsSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const ButtonSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const CharacterCountSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const CheckboxesSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const CookieBannerSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const DateInputSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const DetailsSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const ErrorMessageSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const ErrorSummarySchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const ExitThisPageSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const FieldsetSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const FileUploadSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const GOVUKFooterSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const GOVUKHeaderSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const InsetTextSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const NotificationBannerSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const PaginationSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const PanelSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const PasswordInputSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const PhaseBannerSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const RadiosSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const SelectSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const ServiceNavigationSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const SkipLinkSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const SummaryListSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const TableSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const TabsSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const TagSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const TaskListSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const TextInputSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const TextareaSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const WarningTextSchema = z.object({
	config: z.object({
		placeholder: z.string(),
	}),
});

export const ComponentTypeEnum = z.enum([
	'Accordion',
	'BackLink',
	'Breadcrumbs',
	'Button',
	'CharacterCount',
	'Checkboxes',
	'CookieBanner',
	'DateInput',
	'Details',
	'ErrorMessage',
	'ErrorSummary',
	'ExitThisPage',
	'Fieldset',
	'FileUpload',
	'GOVUKFooter',
	'GOVUKHeader',
	'InsetText',
	'NotificationBanner',
	'Pagination',
	'Panel',
	'PasswordInput',
	'PhaseBanner',
	'Radios',
	'Select',
	'ServiceNavigation',
	'SkipLink',
	'SummaryList',
	'Table',
	'Tabs',
	'Tag',
	'TaskList',
	'TextInput',
	'Textarea',
	'WarningText',
]);

export const ComponentSchema = z.object({
	component: ComponentTypeEnum,
	config: z.any(),
});

export const ComponentsSchema = z.array(ComponentSchema);

export const PageSchema = z.object({
	title: z.string(),
	components: ComponentsSchema,
});

export const MultiPageSchema = z.object({
	pages: z.array(PageSchema),
	currentPage: z.number(),
});