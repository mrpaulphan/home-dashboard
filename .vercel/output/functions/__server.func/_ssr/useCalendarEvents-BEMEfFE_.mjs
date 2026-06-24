import { __toESM } from "../_runtime.mjs";
import { Link, require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { ArrowRight, MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useCalendarEvents-BEMEfFE_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function parseEventDate(value) {
	if (value.length === 10) {
		const [year, month, day] = value.split("-").map(Number);
		return new Date(year, month - 1, day);
	}
	return new Date(value);
}
function getLocalDayKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function getEventDayKey(value) {
	return getLocalDayKey(parseEventDate(value));
}
function formatEventTime(event) {
	if (event.allDay) return "All day";
	return new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "2-digit"
	}).format(parseEventDate(event.start));
}
function formatSectionDate(dayKey) {
	const [year, month, day] = dayKey.split("-").map(Number);
	const date = new Date(year, month - 1, day);
	const todayKey = getLocalDayKey(/* @__PURE__ */ new Date());
	const tomorrow = /* @__PURE__ */ new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowKey = getLocalDayKey(tomorrow);
	if (dayKey === todayKey) return "Today";
	if (dayKey === tomorrowKey) return "Tomorrow";
	return new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		month: "short",
		day: "numeric"
	}).format(date);
}
function groupEventsByDay(events) {
	const groups = /* @__PURE__ */ new Map();
	for (const event of events) {
		const dayKey = getEventDayKey(event.start);
		const existing = groups.get(dayKey) ?? [];
		existing.push(event);
		groups.set(dayKey, existing);
	}
	return Array.from(groups.entries()).sort(([left], [right]) => left.localeCompare(right)).map(([dayKey, dayEvents]) => ({
		dayKey,
		label: formatSectionDate(dayKey),
		events: dayEvents.sort((left, right) => parseEventDate(left.start).getTime() - parseEventDate(right.start).getTime())
	}));
}
function getMonthGrid(viewDate) {
	const year = viewDate.getFullYear();
	const month = viewDate.getMonth();
	const startOffset = new Date(year, month, 1).getDay();
	const gridStart = new Date(year, month, 1 - startOffset);
	const cells = [];
	for (let index = 0; index < 42; index += 1) {
		const cell = new Date(gridStart);
		cell.setDate(gridStart.getDate() + index);
		cells.push(cell);
	}
	return cells;
}
function formatMonthLabel(viewDate) {
	return new Intl.DateTimeFormat(void 0, {
		month: "long",
		year: "numeric"
	}).format(viewDate);
}
function isSameDay(left, right) {
	return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
}
function eventsForDay(events, day) {
	const dayKey = getEventDayKey(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`);
	return events.filter((event) => getEventDayKey(event.start) === dayKey);
}
function EventCard({ event, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
		"data-testid": `events-event-${event.id}-card`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-start justify-between gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-slate-900",
						"data-testid": `events-event-${event.id}-title-text`,
						children: event.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-blue-700",
						"data-testid": `events-event-${event.id}-time-text`,
						children: formatEventTime(event)
					}),
					event.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-1 text-sm text-slate-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
							className: "h-3.5 w-3.5 shrink-0",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": `events-event-${event.id}-location-text`,
							children: event.location
						})]
					}) : null,
					!compact && event.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-600",
						"data-testid": `events-event-${event.id}-description-text`,
						children: event.description
					}) : null
				]
			})
		})
	});
}
function EventList({ events, emptyMessage = "No upcoming events in the next 30 days.", compact = false }) {
	if (events.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600",
		"data-testid": "events-empty-text",
		children: emptyMessage
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		"data-testid": "events-list-container",
		children: groupEventsByDay(events).map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			"data-testid": `events-day-${group.dayKey}-section`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500",
				"data-testid": `events-day-${group.dayKey}-header`,
				children: group.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: group.events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
					event,
					compact
				}, event.id))
			})]
		}, group.dayKey))
	});
}
function UpcomingEventsPreview({ events, loading, error }) {
	const previewEvents = events.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
		"data-testid": "home-upcomingEvents-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-slate-900",
					"data-testid": "home-upcomingEvents-header",
					children: "Upcoming events"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/events",
					className: "inline-flex items-center gap-1 text-sm font-medium text-blue-700",
					"data-testid": "home-upcomingEvents-viewAll-link",
					children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-500",
				"data-testid": "home-upcomingEvents-loading-text",
				children: "Loading events…"
			}) : null,
			!loading && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-amber-700",
				"data-testid": "home-upcomingEvents-error-text",
				children: error
			}) : null,
			!loading && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
				events: previewEvents,
				compact: true,
				emptyMessage: "No events coming up. Check that the calendar is public and the API key is set."
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
export { EventList, UpcomingEventsPreview, eventsForDay, formatEventTime, formatMonthLabel, getEventDayKey, getLocalDayKey, getMonthGrid, isSameDay, useCalendarEvents };
