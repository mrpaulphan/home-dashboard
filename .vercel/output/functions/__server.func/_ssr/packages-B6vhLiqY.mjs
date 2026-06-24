import { require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { Check } from "../_libs/lucide-react.mjs";
import { PageShell } from "./PageShell-CGfmo_X5.mjs";
import { formatRecipient, formatRelativeArrival, markPackagePickedUp, usePackages } from "./usePackages-BqHf7-a0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages-B6vhLiqY.js
var import_jsx_runtime = require_jsx_runtime();
function PackageList({ packages, loading, error, emptyMessage = "Nothing waiting right now." }) {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		"data-testid": "packages-loading-text",
		children: "Loading packages…"
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-destructive",
		"data-testid": "packages-error-text",
		children: error
	});
	if (packages.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground",
		"data-testid": "packages-empty-text",
		children: emptyMessage
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		"data-testid": "packages-list-container",
		children: packages.map((pkg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: "rounded-lg border border-border bg-card p-4 shadow-sm",
			"data-testid": `packages-row-${pkg.id}-card`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						"data-testid": `packages-row-${pkg.id}-recipient-text`,
						children: formatRecipient(pkg.recipient)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-lg font-semibold text-card-foreground",
						"data-testid": `packages-row-${pkg.id}-title-text`,
						children: pkg.code ? `Code ${pkg.code}` : pkg.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						"data-testid": `packages-row-${pkg.id}-meta-text`,
						children: [
							pkg.carrier,
							" · ",
							formatRelativeArrival(pkg.last_seen_at ?? pkg.arrived_at)
						]
					}),
					pkg.code && pkg.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: pkg.description
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground",
					"data-testid": `packages-row-${pkg.id}-pickedUp-button`,
					onClick: () => {
						markPackagePickedUp(pkg.id);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					}), "Got it"]
				})]
			})
		}, pkg.id))
	});
}
function PackagesPage() {
	const { packages, loading, error } = usePackages();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Packages",
		subtitle: "Waiting pickups from the Luxor package room.",
		testId: "packages-page-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageList, {
			packages,
			loading,
			error,
			emptyMessage: "Nothing waiting right now. New Luxor alerts will show up here automatically."
		})
	});
}
//#endregion
export { PackagesPage as component };
