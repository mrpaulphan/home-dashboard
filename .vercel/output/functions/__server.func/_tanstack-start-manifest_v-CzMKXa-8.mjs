//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CzMKXa-8.js
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
		preloads: ["/assets/index-KEuVdDTa.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-KEuVdDTa.js"
		} }]
	},
	"/": {
		filePath: "/Users/paulphan/Development/home-dashboard/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-Ch2-1qgw.js",
			"/assets/useCalendarEvents-V_dtOT_e.js",
			"/assets/PageShell-JHQyPMj3.js",
			"/assets/usePackages-OpmBa_rL.js"
		]
	},
	"/events": {
		filePath: "/Users/paulphan/Development/home-dashboard/src/routes/events.tsx",
		children: void 0,
		preloads: [
			"/assets/events-w52_819K.js",
			"/assets/useCalendarEvents-V_dtOT_e.js",
			"/assets/PageShell-JHQyPMj3.js"
		]
	},
	"/packages": {
		filePath: "/Users/paulphan/Development/home-dashboard/src/routes/packages.tsx",
		children: void 0,
		preloads: [
			"/assets/packages-CiZvZKio.js",
			"/assets/PageShell-JHQyPMj3.js",
			"/assets/usePackages-OpmBa_rL.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
