import { z } from 'zod';

export const AccordionSchema = z.object({
	config: z.object({
		id: z.string(),
		sections: z.array(z.object({
			heading: z.string(),
			content: z.string(),
			expanded: z.boolean().optional(),
		})),
	}),
});

export const BackLinkSchema = z.object({
	config: z.object({
		text: z.string().optional().default("Back"),
		href: z.string(),
	}),
});

export const BreadcrumbsSchema = z.object({
	config: z.object({
		items: z.array(z.object({
			text: z.string(),
			href: z.string().optional(),
		})),
	}),
});

export const ButtonSchema = z.object({
	config: z.object({
		text: z.string(),
		element: z.enum(["button", "a", "input"]).optional().default("button"),
		href: z.string().optional(),
		disabled: z.boolean().optional(),
	}),
});

export const CharacterCountSchema = z.object({
	config: z.object({
		label: z.string(),
		hint: z.string().optional(),
		name: z.string(),
		maxlength: z.number(),
		rows: z.number().optional().default(5),
		id: z.string().optional(),
	}),
});

export const CheckboxesSchema = z.object({
	config: z.object({
		fieldset: z.object({
			legend: z.object({
				text: z.string(),
				classes: z.string().optional(),
			}),
		}),
		hint: z.string().optional(),
		name: z.string(),
		items: z.array(z.object({
			text: z.string(),
			value: z.string(),
			id: z.string().optional(),
			checked: z.boolean().optional(),
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
				href: z.string().optional(),
				name: z.string().optional(),
				value: z.string().optional(),
			})),
		})),
		hidden: z.boolean().optional(),
	}),
});

export const DateInputSchema = z.object({
	config: z.object({
		fieldset: z.object({
			legend: z.object({
				text: z.string(),
				classes: z.string().optional(),
			}),
		}),
		hint: z.string().optional(),
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
		visuallyHiddenText: z.string().optional().default("Error"),
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
		href: z.string().optional().default("https://www.bbc.co.uk/weather"),
	}),
});

export const FieldsetSchema = z.object({
	config: z.object({
		legend: z.object({
			text: z.string(),
			classes: z.string().optional(),
			isPageHeading: z.boolean().optional(),
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
		titleText: z.string().optional().default("Important"),
		type: z.string().optional(),
	}),
});

export const PaginationSchema = z.object({
	config: z.object({
		items: z.array(z.object({
			number: z.number(),
			href: z.string().optional(),
			current: z.boolean().optional(),
		})).optional(),
		previous: z.object({
			href: z.string().optional(),
			text: z.string().optional(),
		}).optional(),
		next: z.object({
			href: z.string().optional(),
			text: z.string().optional(),
		}).optional(),
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
				classes: z.string().optional(),
			}),
		}),
		name: z.string(),
		items: z.array(z.object({
			text: z.string(),
			value: z.string(),
			id: z.string().optional(),
			checked: z.boolean().optional(),
		})),
		validation: z.array(z.string()).optional(),
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
			selected: z.boolean().optional(),
		})),
		validation: z.array(z.string()).optional(),
	}),
});

export const ServiceNavigationSchema = z.object({
	config: z.object({
		serviceName: z.string(),
		serviceUrl: z.string().optional(),
		navigation: z.array(z.object({
			href: z.string(),
			text: z.string(),
			active: z.boolean().optional(),
		})),
	}),
});

export const SkipLinkSchema = z.object({
	config: z.object({
		text: z.string(),
		href: z.string().optional().default("#"),
	}),
});

export const SummaryListSchema = z.object({
	config: z.object({
		rows: z.array(z.object({
			key: z.object({
				text: z.string(),
			}),
			value: z.object({
				text: z.string().optional(),
				html: z.string().optional(),
			}),
		})),
	}),
});

export const TableSchema = z.object({
	config: z.object({
		caption: z.string(),
		captionClasses: z.string().optional(),
		firstCellIsHeader: z.boolean().optional().default(false),
		head: z.array(z.object({
			text: z.string(),
			html: z.string().optional(),
		})),
		rows: z.array(z.array(z.object({
			text: z.string(),
			html: z.string().optional(),
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
		classes: z.string().optional(),
	}),
});

export const TaskListSchema = z.object({
	config: z.object({
		idPrefix: z.string().optional(),
		items: z.array(z.object({
			title: z.object({
				text: z.string(),
			}),
			href: z.string().optional(),
			hint: z.object({
				text: z.string(),
			}).optional(),
			status: z.object({
				text: z.string().optional(),
				tag: z.object({
					text: z.string(),
					classes: z.string().optional(),
				}).optional(),
			}),
		})),
	}),
});

export const TextInputSchema = z.object({
	config: z.object({
		label: z.object({
			text: z.string(),
			classes: z.string().optional(),
			isPageHeading: z.boolean().optional(),
		}),
		id: z.string(),
		name: z.string(),
		type: z.string().optional().default("text"),
		validation: z.array(z.string()).optional(),
	}),
});

export const TextareaSchema = z.object({
	config: z.object({
		label: z.object({
			text: z.string(),
			classes: z.string().optional(),
			isPageHeading: z.boolean().optional(),
		}),
		hint: z.object({
			text: z.string(),
		}).optional(),
		id: z.string(),
		name: z.string(),
		rows: z.number().optional().default(5),
		validation: z.array(z.string()).optional(),
	}),
});

export const WarningTextSchema = z.object({
	config: z.object({
		text: z.string(),
		iconFallbackText: z.string().optional().default("Warning"),
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