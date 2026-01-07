<script lang="ts">
	import { marked } from 'marked';

	// Custom renderer to add GOV.UK Design System classes
	const renderer = new marked.Renderer() as any;

	renderer.heading = (text: string, level: number) => {
		const classMap: Record<number, string> = {
			1: 'govuk-heading-xl',
			2: 'govuk-heading-l',
			3: 'govuk-heading-m',
			4: 'govuk-heading-s',
		};
		const cls = classMap[level] || 'govuk-heading-s';
		return `<h${level} class="${cls}">${text}</h${level}>`;
	};

	renderer.paragraph = (text: string) => `<p class="govuk-body">${text}</p>`;

	renderer.list = (body: string, ordered: boolean) => {
		const tag = ordered ? 'ol' : 'ul';
		const cls = ordered ? 'govuk-list govuk-list--number' : 'govuk-list govuk-list--bullet';
		return `<${tag} class="${cls}">${body}</${tag}>`;
	};

	renderer.listitem = (text: string) => `<li class="govuk-list-item">${text}</li>`;

	renderer.link = (href: string, title: string, text: string) => {
		return `<a class="govuk-link"${title ? ` title="${title}"` : ''} href="${href}">${text}</a>`;
	};

	renderer.strong = (text: string) => `<strong class="govuk-!-font-weight-bold">${text}</strong>`;

	renderer.em = (text: string) => `<em class="govuk-!-font-style-italic">${text}</em>`;

	marked.setOptions({ renderer });

	let { markdown = '' } = $props<{ markdown: string }>();

	let html = $state('');

	$effect(() => {
		if (markdown) {
			html = marked(markdown) as string;
		} else {
			html = '';
		}
	});
</script>

<div class="govuk-prose-scope">
	{@html html}
</div>
