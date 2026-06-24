import { require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-n0Ul8dVq.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg p-4",
		"data-testid": "home-page-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				"data-testid": "home-page-header",
				children: "Family Hub"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-slate-600",
				"data-testid": "home-page-subtitle-text",
				children: "Shared package tracking for both of you. Install the app and enable notifications to get alerts when a package arrives."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
			"data-testid": "home-packages-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				"data-testid": "home-packages-header",
				children: "Packages"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate-600",
				"data-testid": "home-packages-empty-text",
				children: "No packages yet. When your iOS Shortcut posts to the webhook, they will show up here and trigger push notifications."
			})]
		})]
	});
}
//#endregion
export { Home as component };
