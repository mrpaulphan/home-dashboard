import { Link, require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { ArrowRight, Package } from "../_libs/lucide-react.mjs";
import { UpcomingEventsPreview, useCalendarEvents } from "./useCalendarEvents-fd4nvBEu.mjs";
import { PageShell } from "./PageShell-CGfmo_X5.mjs";
import { usePackages } from "./usePackages-BqHf7-a0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CWZgKzYz.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { events, loading, error } = useCalendarEvents();
	const { packages, loading: packagesLoading } = usePackages();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Family Hub",
		subtitle: "Your shared home for packages and calendar.",
		testId: "home-page-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-card p-5 shadow-sm",
					"data-testid": "home-summary-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "This week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-muted p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-foreground",
								children: packages.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Packages waiting"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-muted p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-foreground",
								children: events.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Upcoming events"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpcomingEventsPreview, {
					events,
					loading,
					error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-card p-4 shadow-sm",
					"data-testid": "home-packagesPreview-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
								className: "h-5 w-5 text-foreground",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-card-foreground",
								"data-testid": "home-packagesPreview-header",
								children: "Packages"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/packages",
							className: "inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline",
							"data-testid": "home-packagesPreview-viewAll-link",
							children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})]
						})]
					}), packagesLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading packages…"
					}) : packages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						"data-testid": "home-packagesPreview-empty-text",
						children: "Nothing waiting in the package room right now."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: packages.slice(0, 2).map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-muted px-3 py-2",
							"data-testid": `home-packagesPreview-${pkg.id}-row`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: pkg.code ? `Code ${pkg.code}` : pkg.description
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["For ", pkg.recipient === "paul" ? "Paul" : "Sarah"]
							})]
						}, pkg.id))
					})]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
