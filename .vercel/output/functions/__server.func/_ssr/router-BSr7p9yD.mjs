import { __toESM } from "../_runtime.mjs";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, require_jsx_runtime, require_react, useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { CalendarDays, House, Package } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BSr7p9yD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SW_PATH = "/sw.js";
function urlBase64ToUint8Array(base64String) {
	const base64 = (base64String + "=".repeat((4 - base64String.length % 4) % 4)).replace(/-/g, "+").replace(/_/g, "/");
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; i += 1) outputArray[i] = rawData.charCodeAt(i);
	return outputArray;
}
function isStandalonePwa() {
	return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}
function isIosDevice() {
	return /iphone|ipad|ipod/i.test(navigator.userAgent);
}
function canSubscribeToPush() {
	if (!("Notification" in window) || !("serviceWorker" in navigator)) return false;
	if (isIosDevice() && !isStandalonePwa()) return false;
	return true;
}
async function registerServiceWorker() {
	if (!("serviceWorker" in navigator)) return null;
	return navigator.serviceWorker.register(SW_PATH, { scope: "/" });
}
async function subscribeToPush(deviceLabel) {
	const publicKey = "BJsVPxMOy_JzmXlKGdBIuPS-r5K3OnWJkFir7-0Fw1L6srKytfSTIEmQeTP6qRR2RqE--oa0aAE6s4ESoN7ZGOc";
	if (await Notification.requestPermission() !== "granted") throw new Error("Notification permission was not granted.");
	const registration = await registerServiceWorker();
	if (!registration) throw new Error("Service worker is not supported.");
	await navigator.serviceWorker.ready;
	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicKey)
	});
	const json = subscription.toJSON();
	if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) throw new Error("Invalid push subscription.");
	const response = await fetch("/api/subscribe", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			endpoint: json.endpoint,
			keys: {
				p256dh: json.keys.p256dh,
				auth: json.keys.auth
			},
			device_label: deviceLabel ?? null
		})
	});
	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || "Failed to save push subscription.");
	}
	return subscription;
}
async function ensurePushSubscription() {
	if (!canSubscribeToPush()) return null;
	if (Notification.permission !== "granted") return null;
	const registration = await registerServiceWorker();
	if (!registration) return null;
	await navigator.serviceWorker.ready;
	let subscription = await registration.pushManager.getSubscription();
	if (!subscription) return null;
	const json = subscription.toJSON();
	if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) return null;
	await fetch("/api/subscribe", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			endpoint: json.endpoint,
			keys: {
				p256dh: json.keys.p256dh,
				auth: json.keys.auth
			}
		})
	});
	return subscription;
}
function EnableNotifications() {
	const [permission, setPermission] = (0, import_react.useState)("default");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [showPrompt, setShowPrompt] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!("Notification" in window)) return;
		setPermission(Notification.permission);
		if (Notification.permission === "granted") {
			ensurePushSubscription();
			return;
		}
		if (canSubscribeToPush()) setShowPrompt(true);
	}, []);
	if (!showPrompt || permission === "granted" || permission === "denied") return null;
	const handleEnable = async () => {
		setIsLoading(true);
		setError(null);
		try {
			await subscribeToPush();
			setPermission("granted");
			setShowPrompt(false);
		} catch (nextError) {
			setError(nextError instanceof Error ? nextError.message : "Could not enable notifications.");
		} finally {
			setIsLoading(false);
		}
	};
	const standaloneHint = isStandalonePwa() ? null : "Install the app first to enable notifications on iPhone.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-4 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950",
		"data-testid": "notifications-enable-banner-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				"data-testid": "notifications-enable-banner-header",
				children: "Enable package alerts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				"data-testid": "notifications-enable-banner-text",
				children: "Get notified when a new package arrives for either of you."
			}),
			standaloneHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-amber-800",
				children: standaloneHint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60",
				"data-testid": "notifications-enable-button",
				disabled: isLoading || !canSubscribeToPush(),
				onClick: handleEnable,
				children: isLoading ? "Enabling…" : "Enable notifications"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-red-700",
				"data-testid": "notifications-enable-error-text",
				children: error
			}) : null
		]
	});
}
function InstallPrompt() {
	const [isStandalone, setIsStandalone] = (0, import_react.useState)(false);
	const [isIos, setIsIos] = (0, import_react.useState)(false);
	const [installEvent, setInstallEvent] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setIsStandalone(isStandalonePwa());
		setIsIos(isIosDevice());
		const handleBeforeInstallPrompt = (event) => {
			event.preventDefault();
			setInstallEvent(event);
		};
		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		};
	}, []);
	if (isStandalone) return null;
	if (isIos) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-4 mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950",
		"data-testid": "install-ios-banner-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold",
			"data-testid": "install-ios-banner-header",
			children: "Add Family Hub to your home screen"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm",
			"data-testid": "install-ios-banner-text",
			children: "Push notifications on iPhone only work after installing the app. Tap Share, then Add to Home Screen, then open Family Hub from the new icon."
		})]
	});
	if (!installEvent) return null;
	const handleInstall = async () => {
		await installEvent.prompt();
		await installEvent.userChoice;
		setInstallEvent(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-4 mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-950",
		"data-testid": "install-android-banner-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				"data-testid": "install-android-banner-header",
				children: "Install Family Hub"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				"data-testid": "install-android-banner-text",
				children: "Install the app for faster access and package alerts."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white",
				"data-testid": "install-android-install-button",
				onClick: handleInstall,
				children: "Install app"
			})
		]
	});
}
function PwaShell() {
	(0, import_react.useEffect)(() => {
		registerServiceWorker();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallPrompt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnableNotifications, {})] });
}
var navItems = [
	{
		to: "/",
		label: "Home",
		icon: House,
		testId: "nav-home-link"
	},
	{
		to: "/events",
		label: "Events",
		icon: CalendarDays,
		testId: "nav-events-link"
	},
	{
		to: "/packages",
		label: "Packages",
		icon: Package,
		testId: "nav-packages-link"
	}
];
function MobileNav() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur",
		"data-testid": "mobile-nav-container",
		style: { paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-lg grid-cols-3 px-2 pt-2",
			children: navItems.map((item) => {
				const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: `flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
					"data-testid": item.testId,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-xl p-1.5 transition-colors ${isActive ? "bg-primary/15 text-primary" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
				}, item.to);
			})
		})
	});
}
var styles_default = "/assets/styles-8fV2DLMz.css";
var Route$6 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "Family Hub" },
			{
				name: "description",
				content: "Shared packages and home dashboard for two people."
			},
			{
				name: "theme-color",
				content: "#2563eb"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Family Hub"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.svg"
			},
			{
				rel: "icon",
				href: "/icons/icon-192.svg"
			}
		]
	}),
	shellComponent: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-background text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaShell, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$2 = () => import("./packages-B6vhLiqY.mjs");
var Route$5 = createFileRoute("/packages")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./events-NyPHaR8z.mjs");
var Route$4 = createFileRoute("/events")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./routes-CWZgKzYz.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$2 = createFileRoute("/api/subscribe")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { savePushSubscription } = await import("./push-DPUe8WRb.mjs");
		const body = await request.json();
		if (!body.endpoint || !body.keys?.p256dh || !body.keys?.auth) return Response.json({ error: "Invalid subscription payload." }, { status: 400 });
		const id = await savePushSubscription({
			endpoint: body.endpoint,
			keys: body.keys
		}, body.device_label ?? void 0);
		return Response.json({
			ok: true,
			id
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to save subscription.";
		return Response.json({ error: message }, { status: 500 });
	}
} } } });
function parsePackageMessage(message) {
	const trimmed = message.trim();
	return {
		carrier: trimmed.match(/\b(USPS|UPS|FedEx|Amazon|DHL|OnTrac)\b/i)?.[1] ?? "Unknown",
		description: trimmed.replace(/\b(USPS|UPS|FedEx|Amazon|DHL|OnTrac)\b/gi, "").replace(/\s+/g, " ").trim() || trimmed
	};
}
var Route$1 = createFileRoute("/api/webhook/packages")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const secret = request.headers.get("x-webhook-secret");
		if (!secret || secret !== process.env.WEBHOOK_SECRET) return Response.json({ error: "Unauthorized." }, { status: 401 });
		const body = await request.json();
		if (!body.message || !body.recipient) return Response.json({ error: "message and recipient are required." }, { status: 400 });
		if (body.recipient !== "paul" && body.recipient !== "girlfriend") return Response.json({ error: "Invalid recipient." }, { status: 400 });
		const { carrier, description } = parsePackageMessage(body.message);
		const { FieldValue } = await import("firebase-admin/firestore");
		const { getAdminDb } = await import("./firebase-admin-BaHRc9Bb.mjs");
		const { sendPushToAll } = await import("./push-DPUe8WRb.mjs");
		const docRef = await getAdminDb().collection("packages").add({
			recipient: body.recipient,
			description,
			carrier,
			arrived_at: FieldValue.serverTimestamp(),
			status: "pending",
			raw_message: body.message
		});
		const pushResult = await sendPushToAll({
			title: `Package for ${body.recipient}`,
			body: `${carrier}: ${description}`,
			url: "/"
		});
		return Response.json({
			ok: true,
			id: docRef.id,
			push: pushResult
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Webhook failed.";
		return Response.json({ error: message }, { status: 500 });
	}
} } } });
var Route = createFileRoute("/api/calendar/events")({ server: { handlers: { GET: async () => {
	try {
		const { fetchUpcomingCalendarEvents, UPCOMING_EVENTS_DAYS } = await import("./calendar-server-BzBDDbhO.mjs");
		const events = await fetchUpcomingCalendarEvents(UPCOMING_EVENTS_DAYS);
		return Response.json({ events });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to load calendar events.";
		return Response.json({
			error: message,
			events: []
		}, { status: 500 });
	}
} } } });
var PackagesRoute = Route$5.update({
	id: "/packages",
	path: "/packages",
	getParentRoute: () => Route$6
});
var EventsRoute = Route$4.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$6
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var ApiSubscribeRoute = Route$2.update({
	id: "/api/subscribe",
	path: "/api/subscribe",
	getParentRoute: () => Route$6
});
var ApiWebhookPackagesRoute = Route$1.update({
	id: "/api/webhook/packages",
	path: "/api/webhook/packages",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	EventsRoute,
	PackagesRoute,
	ApiSubscribeRoute,
	ApiCalendarEventsRoute: Route.update({
		id: "/api/calendar/events",
		path: "/api/calendar/events",
		getParentRoute: () => Route$6
	}),
	ApiWebhookPackagesRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter };
