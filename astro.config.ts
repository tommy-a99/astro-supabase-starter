import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

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

	adapter: netlify(),
	integrations: [react()],
});
