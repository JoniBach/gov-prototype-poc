import { z } from 'zod';

export const AccordionSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const BackLinkSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const BreadcrumbsSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const ButtonSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const CharacterCountSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const CheckboxesSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const CookieBannerSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const DateInputSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const DetailsSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const ErrorMessageSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const ErrorSummarySchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const ExitThisPageSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const FieldsetSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const FileUploadSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const GOVUKFooterSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const GOVUKHeaderSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const InsetTextSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const NotificationBannerSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const PaginationSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const PanelSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const PasswordInputSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const PhaseBannerSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const RadiosSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const SelectSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const ServiceNavigationSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const SkipLinkSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const SummaryListSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const TableSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const TabsSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const TagSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const TaskListSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const TextInputSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const TextareaSchema = z.object({
	props: z.object({
		placeholder: z.string(),
	}),
});

export const WarningTextSchema = z.object({
	props: z.object({
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
	'GOVUKFooter',
	'GOVUKHeader',
	'InsetText',
	'NotificationBanner',
	'Pagination',
	'Panel',
	'PasswordInput',
	'PhaseBanner',
	'Radios',
	'Tabs',
	'Tag',
	'TaskList',
	'TextInput',
	'Textarea',
	'WarningText',
]);
