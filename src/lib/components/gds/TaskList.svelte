<script lang="ts">
	import { TaskListSchema } from '../schema.js';

	let raw = $props();
	const { config } = TaskListSchema.parse(raw);
</script>

<ul class="govuk-task-list">
	{#each config.items as item, i}
		<li class="govuk-task-list__item">
			<div class="govuk-task-list__name-and-hint">
				{#if item.href}
					<a class="govuk-link govuk-task-list__link" href={item.href}>
						{item.title.text}
					</a>
				{:else}
					<div class="govuk-task-list__name">
						{item.title.text}
					</div>
				{/if}
				{#if item.hint}
					<div class="govuk-task-list__hint">
						{item.hint.text}
					</div>
				{/if}
			</div>
			<div class="govuk-task-list__status">
				{#if item.status.tag}
					<strong class="govuk-tag {item.status.tag.classes || ''}">
						{item.status.tag.text}
					</strong>
				{:else if item.status.text}
					{item.status.text}
				{/if}
			</div>
		</li>
	{/each}
</ul>
