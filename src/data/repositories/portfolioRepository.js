import { getCollection } from 'astro:content';

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

export const portfolioRepository = {
	async getSiteSettings() {
		const entries = await getCollection('siteSettings');
		const settings = entries[0]?.data;

		if (!settings) {
			return {
                lang: '',
				site_name: '',
				seo_title: '',
				seo_description: '',
				nav_items: []
			};
		}

		return {
			...settings,
			nav_items: [...settings.nav_items].sort(byOrder)
		};
	},

	async getAboutMe() {
		const entries = await getCollection('about');
		const about = entries[0]?.data;

		if (!about) {
			return {
				name: '',
				description: '',
				email: ''
			};
		}

		return about;
	},

	async getSocialLinks() {
		const entries = await getCollection('socialLinks');
		return entries.map((entry) => entry.data).sort(byOrder);
	},

	async getSkills() {
		const entries = await getCollection('skills');
		const categories = entries
			.flatMap((entry) => entry.data.categories ?? [])
			.sort(byOrder);

		return categories;
	},

	async getProjects() {
		const entries = await getCollection('projects');
		const projects = entries
			.flatMap((entry) => entry.data.items ?? [])
			.sort(byOrder);

		return projects;
	},

	async getHomeData() {
		const [siteSettings, aboutMe, socialLinks, skills, projects] = await Promise.all([
			this.getSiteSettings(),
			this.getAboutMe(),
			this.getSocialLinks(),
			this.getSkills(),
			this.getProjects()
		]);

		return {
			siteSettings,
			aboutMe,
			socialLinks,
			skills,
			projects
		};
	}
};
