import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const about = defineCollection({
	loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		email: z.string()
	})
});

const siteSettings = defineCollection({
	loader: glob({ base: './src/content/site-settings', pattern: '**/*.md' }),
	schema: z.object({
		lang: z.enum(['es']),
		site_name: z.string(),
		seo_title: z.string(),
		seo_description: z.string(),
		nav_items: z.array(
			z.object({
				id: z.string(),
				label: z.string(),
				href: z.string(),
				order: z.number()
			})
		)
	})
});

const socialLinks = defineCollection({
	loader: glob({ base: './src/content/social-links', pattern: '**/*.md' }),
	schema: z.object({
		platform: z.string(),
		url: z.string(),
		icon: z.string(),
		alt: z.string(),
		order: z.number()
	})
});

const skills = defineCollection({
	loader: glob({ base: './src/content/skills', pattern: '**/*.md' }),
	schema: z.object({
		categories: z.array(
			z.object({
				title: z.string(),
				order: z.number().optional(),
				items: z.array(
					z.object({
						name: z.string(),
						icon: z.string(),
						alt: z.string()
					})
				)
			})
		)
	})
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
	schema: z.object({
		items: z.array(
			z.object({
				slug: z.string(),
				name: z.string(),
				description: z.string(),
				technologies: z.array(z.string()),
				repository_url: z.string(),
				image: z.string(),
				image_alt: z.string(),
				order: z.number().optional()
			})
		)
	})
});

export const collections = {
	siteSettings,
	about,
	socialLinks,
	skills,
	projects
};
