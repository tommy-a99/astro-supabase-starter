import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: "github-light-high-contrast",
		},
	},

	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: [".netlify.app"],
		},
	},

	i18n: {
		locales: ["en", "ko"],
		defaultLocale: "en",
	},

	adapter: netlify(),
	integrations: [react()],
});
