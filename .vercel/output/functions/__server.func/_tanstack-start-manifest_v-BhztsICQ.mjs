//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-BhztsICQ.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/Users/paulphan/Development/home-dashboard/src/routes/__root.tsx",
		children: [
			"/",
			"/events",
			"/packages",
			"/api/subscribe",
			"/api/calendar/events",
			"/api/webhook/packages"
		],
		preloads: ["/assets/index-BZ8CQxx2.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BZ8CQxx2.js"
		} }]
	},
	"/": {
		filePath: "/Users/paulphan/Development/home-dashboard/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DnwsCtmH.js",
			"/assets/useCalendarEvents-C0L6ueQu.js",
			"/assets/PageShell-BmjK68sU.js",
			"/assets/usePackages-CSTbYL5Z.js"
		]
	},
	"/events": {
		filePath: "/Users/paulphan/Development/home-dashboard/src/routes/events.tsx",
		children: void 0,
		preloads: [
			"/assets/events-BPd9mEk3.js",
			"/assets/useCalendarEvents-C0L6ueQu.js",
			"/assets/PageShell-BmjK68sU.js"
		]
	},
	"/packages": {
		filePath: "/Users/paulphan/Development/home-dashboard/src/routes/packages.tsx",
		children: void 0,
		preloads: [
			"/assets/packages-DSK0B442.js",
			"/assets/PageShell-BmjK68sU.js",
			"/assets/usePackages-CSTbYL5Z.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
