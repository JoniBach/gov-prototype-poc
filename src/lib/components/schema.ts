import { z } from 'zod';

export const AccordionSchema = z.object({
	config: z.object({
		id: z.string(),
		sections: z.array(z.object({
			heading: z.string(),
			content: z.string(),
			expanded: z.boolean().optional().nullable(),
		})),
	}),
});

export const BackLinkSchema = z.object({
	config: z.object({
		text: z.string().optional().nullable().default("Back"),
		href: z.string(),
	}),
});

export const BreadcrumbsSchema = z.object({
	config: z.object({
		items: z.array(z.object({
			text: z.string(),
			href: z.string().optional().nullable(),
		})),
	}),
});

export const ButtonSchema = z.object({
	config: z.object({
		text: z.string(),
		element: z.enum(["button", "a", "input"]).optional().nullable().default("button"),
		href: z.string().optional().nullable(),
		disabled: z.boolean().optional().nullable(),
	}),
});

export const CharacterCountSchema = z.object({
	config: z.object({
		label: z.string(),
		hint: z.string().optional().nullable(),
		name: z.string(),
		maxlength: z.number(),
		rows: z.number().optional().nullable().default(5),
		id: z.string().optional().nullable(),
	}),
});

export const CheckboxesSchema = z.object({
	config: z.object({
		fieldset: z.object({
			legend: z.object({
				text: z.string(),
				classes: z.string().optional().nullable(),
			}),
		}),
		hint: z.string().optional().nullable(),
		name: z.string(),
		items: z.array(z.object({
			text: z.string(),
			value: z.string(),
			id: z.string().optional().nullable(),
			checked: z.boolean().optional().nullable(),
		})),
	}),
});

export const CookieBannerSchema = z.object({
	config: z.object({
		ariaLabel: z.string(),
		messages: z.array(z.object({
			headingText: z.string(),
			content: z.string(),
			actions: z.array(z.object({
				type: z.string(),
				text: z.string(),
				href: z.string().optional().nullable(),
				name: z.string().optional().nullable(),
				value: z.string().optional().nullable(),
			})),
		})),
		hidden: z.boolean().optional().nullable(),
	}),
});

export const DateInputSchema = z.object({
	config: z.object({
		fieldset: z.object({
			legend: z.object({
				text: z.string(),
				classes: z.string().optional().nullable(),
			}),
		}),
		hint: z.string().optional().nullable(),
		id: z.string(),
		name: z.string(),
	}),
});

export const DetailsSchema = z.object({
	config: z.object({
		summaryText: z.string(),
		text: z.string(),
	}),
});

export const ErrorMessageSchema = z.object({
	config: z.object({
		text: z.string(),
		visuallyHiddenText: z.string().optional().nullable().default("Error"),
	}),
});

export const ErrorSummarySchema = z.object({
	config: z.object({
		titleText: z.string(),
		errorList: z.array(z.object({
			text: z.string(),
			href: z.string(),
		})),
	}),
});

export const ExitThisPageSchema = z.object({
	config: z.object({
		text: z.string(),
		href: z.string().optional().nullable().default("https://www.bbc.co.uk/weather"),
	}),
});

export const FieldsetSchema = z.object({
	config: z.object({
		legend: z.object({
			text: z.string(),
			classes: z.string().optional().nullable(),
			isPageHeading: z.boolean().optional().nullable(),
		}),
	}),
});

export const FileUploadSchema = z.object({
	config: z.object({
		label: z.object({
			text: z.string(),
		}),
		id: z.string(),
		name: z.string(),
	}),
});

export const GOVUKFooterSchema = z.object({
	config: z.object({}),
});

export const GOVUKHeaderSchema = z.object({
	config: z.object({}),
});

export const InsetTextSchema = z.object({
	config: z.object({
		text: z.string(),
	}),
});

export const NotificationBannerSchema = z.object({
	config: z.object({
		text: z.string(),
		titleText: z.string().optional().nullable().default("Important"),
		type: z.string().optional().nullable(),
	}),
});

export const PaginationSchema = z.object({
	config: z.object({
		items: z.array(z.object({
			number: z.number(),
			href: z.string().optional().nullable(),
			current: z.boolean().optional().nullable(),
		})).optional().nullable(),
		previous: z.object({
			href: z.string().optional().nullable(),
			text: z.string().optional().nullable(),
		}).optional().nullable(),
		next: z.object({
			href: z.string().optional().nullable(),
			text: z.string().optional().nullable(),
		}).optional().nullable(),
	}),
});

export const PanelSchema = z.object({
	config: z.object({
		titleText: z.string(),
		html: z.string(),
	}),
});

export const PasswordInputSchema = z.object({
	config: z.object({
		label: z.object({
			text: z.string(),
		}),
		id: z.string(),
		name: z.string(),
	}),
});

export const PhaseBannerSchema = z.object({
	config: z.object({
		tag: z.object({
			text: z.string(),
		}),
		html: z.string(),
	}),
});

export const RadiosSchema = z.object({
	config: z.object({
		fieldset: z.object({
			legend: z.object({
				text: z.string(),
				classes: z.string().optional().nullable(),
			}),
		}),
		name: z.string(),
		items: z.array(z.object({
			text: z.string(),
			value: z.string(),
			id: z.string().optional().nullable(),
			checked: z.boolean().optional().nullable(),
		})),
		validation: z.array(z.string()).optional().nullable(),
	}),
});

export const SelectSchema = z.object({
	config: z.object({
		label: z.object({
			text: z.string(),
		}),
		id: z.string(),
		name: z.string(),
		items: z.array(z.object({
			text: z.string(),
			value: z.string(),
			selected: z.boolean().optional().nullable(),
		})),
		validation: z.array(z.string()).optional().nullable(),
	}),
});

export const ServiceNavigationSchema = z.object({
	config: z.object({
		serviceName: z.string(),
		serviceUrl: z.string().optional().nullable(),
		navigation: z.array(z.object({
			href: z.string(),
			text: z.string(),
			active: z.boolean().optional().nullable(),
		})),
	}),
});

export const SkipLinkSchema = z.object({
	config: z.object({
		text: z.string(),
		href: z.string().optional().nullable().default("#"),
	}),
});

export const SummaryListSchema = z.object({
	config: z.object({
		rows: z.array(z.object({
			key: z.object({
				text: z.string(),
			}),
			value: z.object({
				text: z.string().optional().nullable(),
				html: z.string().optional().nullable(),
			}),
		})),
	}),
});

export const TableSchema = z.object({
	config: z.object({
		caption: z.string(),
		captionClasses: z.string().optional().nullable(),
		firstCellIsHeader: z.boolean().optional().nullable().default(false),
		head: z.array(z.object({
			text: z.string(),
			html: z.string().optional().nullable(),
		})),
		rows: z.array(z.array(z.object({
			text: z.string(),
			html: z.string().optional().nullable(),
		}))),
	}),
});

export const TabsSchema = z.object({
	config: z.object({
		title: z.string(),
		items: z.array(z.object({
			id: z.string(),
			label: z.string(),
			content: z.string(),
		})),
	}),
});

export const TagSchema = z.object({
	config: z.object({
		text: z.string(),
		classes: z.string().optional().nullable(),
	}),
});

export const TaskListSchema = z.object({
	config: z.object({
		idPrefix: z.string().optional().nullable(),
		items: z.array(z.object({
			title: z.object({
				text: z.string(),
			}),
			href: z.string().optional().nullable(),
			hint: z.object({
				text: z.string(),
			}).optional().nullable(),
			status: z.object({
				text: z.string().optional().nullable(),
				tag: z.object({
					text: z.string(),
					classes: z.string().optional().nullable(),
				}).optional().nullable(),
			}),
		})),
	}),
});

export const TextInputSchema = z.object({
	config: z.object({
		label: z.object({
			text: z.string(),
			classes: z.string().optional().nullable(),
			isPageHeading: z.boolean().optional().nullable(),
		}),
		id: z.string(),
		name: z.string(),
		type: z.string().optional().nullable().default("text"),
		validation: z.array(z.string()).optional().nullable(),
	}),
});

export const TextareaSchema = z.object({
	config: z.object({
		label: z.object({
			text: z.string(),
			classes: z.string().optional().nullable(),
			isPageHeading: z.boolean().optional().nullable(),
		}),
		hint: z.object({
			text: z.string(),
		}).optional().nullable(),
		id: z.string(),
		name: z.string(),
		rows: z.number().optional().nullable().default(5),
		validation: z.array(z.string()).optional().nullable(),
	}),
});

export const TypographySchema = z.object({
	config: z.object({
		text: z.string(),
		variant: z.string(),
	}),
});

export const WarningTextSchema = z.object({
	config: z.object({
		text: z.string(),
		iconFallbackText: z.string().optional().nullable().default("Warning"),
	}),
});

export const configurationSchema = {
	Accordion: AccordionSchema,
	BackLink: BackLinkSchema,
	Breadcrumbs: BreadcrumbsSchema,
	Button: ButtonSchema,
	CharacterCount: CharacterCountSchema,
	Checkboxes: CheckboxesSchema,
	CookieBanner: CookieBannerSchema,
	DateInput: DateInputSchema,
	Details: DetailsSchema,
	ErrorMessage: ErrorMessageSchema,
	ErrorSummary: ErrorSummarySchema,
	ExitThisPage: ExitThisPageSchema,
	Fieldset: FieldsetSchema,
	FileUpload: FileUploadSchema,
	GOVUKFooter: GOVUKFooterSchema,
	GOVUKHeader: GOVUKHeaderSchema,
	InsetText: InsetTextSchema,
	NotificationBanner: NotificationBannerSchema,
	Pagination: PaginationSchema,
	Panel: PanelSchema,
	PasswordInput: PasswordInputSchema,
	PhaseBanner: PhaseBannerSchema,
	Radios: RadiosSchema,
	Select: SelectSchema,
	ServiceNavigation: ServiceNavigationSchema,
	SkipLink: SkipLinkSchema,
	SummaryList: SummaryListSchema,
	Table: TableSchema,
	Tabs: TabsSchema,
	Tag: TagSchema,
	TaskList: TaskListSchema,
	TextInput: TextInputSchema,
	Textarea: TextareaSchema,
	Typography: TypographySchema,
	WarningText: WarningTextSchema,
}
export const ConfigurationSchemaEnum = z.object(configurationSchema);

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
	'Typography',
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

export const JourneyIndexSchema = z.object({
	id: z.string(),
	name: z.string(),
	departmentId: z.string(),
	departmentName: z.string(),
	description: z.string(),
});

export const JourneysSchema = z.array(JourneyIndexSchema);


export const HighLevelComponentSchema = z.object({
	component: ComponentTypeEnum,
	id: z.string(),
	config: z.null()
});

export const HighLevelPageSchema = z.object({
	title: z.string(),
	components: z.array(HighLevelComponentSchema),
});
export const HighLevelMultiPageSchema = z.object({
	pages: z.array(HighLevelPageSchema),
});
