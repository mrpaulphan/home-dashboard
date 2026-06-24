import { __toESM } from "../_runtime.mjs";
import { formatEventSchedule, formatEventTime, getGoogleMapsUrl, groupEventsByDay } from "./calendar-Bam_qKKK.mjs";
import { Link, require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { ArrowRight, Clock, MapPin, X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCalendarEvents-fd4nvBEu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventLocationLink({ location, eventId, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: getGoogleMapsUrl(location),
		target: "_blank",
		rel: "noopener noreferrer",
		className: `flex items-start gap-1 text-sm text-primary underline-offset-2 hover:underline ${className}`,
		"data-testid": `events-event-${eventId}-location-link`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
			className: "mt-0.5 h-3.5 w-3.5 shrink-0",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "whitespace-pre-line",
			children: location
		})]
	});
}
function EventDetailSheet({ event, onClose }) {
	(0, import_react.useEffect)(() => {
		if (!event) return;
		const handleKeyDown = (keyboardEvent) => {
			if (keyboardEvent.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [event, onClose]);
	if (!event) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4",
		"data-testid": "events-detail-overlay-container",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-background p-5 shadow-lg",
			"data-testid": "events-detail-sheet-container",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "events-detail-title",
			onClick: (clickEvent) => clickEvent.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "events-detail-title",
					className: "text-xl font-semibold text-foreground",
					"data-testid": "events-detail-title-text",
					children: event.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					"data-testid": "events-detail-close-button",
					"aria-label": "Close event details",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "h-5 w-5",
						"aria-hidden": "true"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), "When"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-sm text-foreground",
						"data-testid": "events-detail-schedule-text",
						children: formatEventSchedule(event)
					})] }),
					event.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
						className: "mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), "Location"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventLocationLink, {
							location: event.location,
							eventId: event.id
						})
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "whitespace-pre-wrap text-sm text-foreground",
						"data-testid": "events-detail-description-text",
						children: event.description ? event.description : "No additional details."
					})] })
				]
			})]
		})
	});
}
function EventCard({ event, compact, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-accent/40",
		"data-testid": `events-event-${event.id}-card`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "w-full text-left",
				"data-testid": `events-event-${event.id}-button`,
				onClick: () => onSelect(event),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-card-foreground",
					"data-testid": `events-event-${event.id}-title-text`,
					children: event.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 flex items-start gap-1 text-sm font-medium text-primary/80",
					"data-testid": `events-event-${event.id}-time-text`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
						className: "mt-0.5 h-3.5 w-3.5 shrink-0",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatEventTime(event) })]
				})]
			}),
			event.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventLocationLink, {
					location: event.location,
					eventId: event.id
				})
			}) : null,
			!compact && event.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
				"data-testid": `events-event-${event.id}-description-text`,
				children: event.description
			}) : null
		]
	});
}
function EventList({ events, emptyMessage = "No upcoming events in the next 3 months.", compact = false }) {
	const [selectedEvent, setSelectedEvent] = (0, import_react.useState)(null);
	if (events.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground",
		"data-testid": "events-empty-text",
		children: emptyMessage
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		"data-testid": "events-list-container",
		children: groupEventsByDay(events).map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-testid": `events-day-${group.dayKey}-section`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 flex items-center gap-2 text-base font-semibold text-foreground",
				"data-testid": `events-day-${group.dayKey}-header`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-4 w-1 shrink-0 rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: group.label
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: group.events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
					event,
					compact,
					onSelect: setSelectedEvent
				}, event.id))
			})]
		}, group.dayKey))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDetailSheet, {
		event: selectedEvent,
		onClose: () => setSelectedEvent(null)
	})] });
}
function UpcomingEventsPreview({ events, loading, error }) {
	const previewEvents = events.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-border bg-card p-4 shadow-sm",
		"data-testid": "home-upcomingEvents-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-card-foreground",
					"data-testid": "home-upcomingEvents-header",
					children: "Upcoming events"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/events",
					className: "inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 hover:underline",
					"data-testid": "home-upcomingEvents-viewAll-link",
					children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				"data-testid": "home-upcomingEvents-loading-text",
				children: "Loading events…"
			}) : null,
			!loading && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				"data-testid": "home-upcomingEvents-error-text",
				children: error
			}) : null,
			!loading && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
				events: previewEvents,
				compact: true,
				emptyMessage: "No events coming up in the next 3 months."
			}) : null
		]
	});
}
function useCalendarEvents() {
	const [events, setEvents] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		async function loadEvents() {
			try {
				const response = await fetch("/api/calendar/events");
				const data = await response.json();
				if (!active) return;
				if (!response.ok) {
					setError(data.error ?? "Failed to load events.");
					setEvents([]);
					return;
				}
				setEvents(data.events ?? []);
				setError(null);
			} catch (nextError) {
				if (!active) return;
				setError(nextError instanceof Error ? nextError.message : "Failed to load events.");
				setEvents([]);
			} finally {
				if (active) setLoading(false);
			}
		}
		loadEvents();
		const handleFocus = () => {
			loadEvents();
		};
		window.addEventListener("focus", handleFocus);
		return () => {
			active = false;
			window.removeEventListener("focus", handleFocus);
		};
	}, []);
	return {
		events,
		loading,
		error
	};
}
//#endregion
export { EventDetailSheet, EventList, UpcomingEventsPreview, useCalendarEvents };
