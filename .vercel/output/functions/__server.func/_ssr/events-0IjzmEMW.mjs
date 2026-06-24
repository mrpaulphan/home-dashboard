import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { ChevronLeft, ChevronRight } from "../_libs/lucide-react.mjs";
import { EventList, eventsForDay, formatEventTime, formatMonthLabel, getEventDayKey, getLocalDayKey, getMonthGrid, isSameDay, useCalendarEvents } from "./useCalendarEvents-BEMEfFE_.mjs";
import { PageShell } from "./PageShell-DOqCRMpC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-0IjzmEMW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventCalendar({ events }) {
	const [viewDate, setViewDate] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [selectedDayKey, setSelectedDayKey] = (0, import_react.useState)(() => getLocalDayKey(/* @__PURE__ */ new Date()));
	const monthCells = (0, import_react.useMemo)(() => getMonthGrid(viewDate), [viewDate]);
	const selectedEvents = (0, import_react.useMemo)(() => {
		const [year, month, day] = selectedDayKey.split("-").map(Number);
		return eventsForDay(events, new Date(year, month - 1, day));
	}, [events, selectedDayKey]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		"data-testid": "events-calendar-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-lg p-2 text-slate-600 hover:bg-slate-100",
						"data-testid": "events-calendar-prevMonth-button",
						"aria-label": "Previous month",
						onClick: () => {
							setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-slate-900",
						"data-testid": "events-calendar-month-header",
						children: formatMonthLabel(viewDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-lg p-2 text-slate-600 hover:bg-slate-100",
						"data-testid": "events-calendar-nextMonth-button",
						"aria-label": "Next month",
						onClick: () => {
							setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-3 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 grid grid-cols-7 gap-1",
					children: [
						"Sun",
						"Mon",
						"Tue",
						"Wed",
						"Thu",
						"Fri",
						"Sat"
					].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-1 text-center text-xs font-medium uppercase text-slate-400",
						children: label
					}, label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 gap-1",
					children: monthCells.map((day) => {
						const dayKey = getEventDayKey(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`);
						const dayEvents = eventsForDay(events, day);
						const inCurrentMonth = day.getMonth() === viewDate.getMonth();
						const isSelected = dayKey === selectedDayKey;
						const isToday = isSameDay(day, /* @__PURE__ */ new Date());
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `min-h-14 rounded-xl border p-1 text-left transition-colors ${isSelected ? "border-blue-500 bg-blue-50" : "border-transparent hover:bg-slate-50"} ${inCurrentMonth ? "text-slate-900" : "text-slate-300"}`,
							"data-testid": `events-calendar-day-${dayKey}-button`,
							onClick: () => setSelectedDayKey(dayKey),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${isToday ? "bg-blue-600 text-white" : ""}`,
								children: day.getDate()
							}), dayEvents.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 space-y-0.5",
								children: [dayEvents.slice(0, 2).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate rounded bg-blue-100 px-1 text-[10px] font-medium text-blue-800",
									children: event.title
								}, event.id)), dayEvents.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] font-medium text-slate-500",
									children: [
										"+",
										dayEvents.length - 2,
										" more"
									]
								}) : null]
							}) : null]
						}, dayKey + day.getMonth());
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
				"data-testid": "events-calendar-selectedDay-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold uppercase tracking-wide text-slate-500",
					"data-testid": "events-calendar-selectedDay-header",
					children: "Selected day"
				}), selectedEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate-600",
					"data-testid": "events-calendar-selectedDay-empty-text",
					children: "No events on this day."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: selectedEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg bg-slate-50 px-3 py-2 text-sm",
						"data-testid": `events-calendar-selectedDay-${event.id}-listItem`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-slate-900",
							children: event.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-500",
							children: formatEventTime(event)
						})]
					}, event.id))
				})]
			})
		]
	});
}
function EventsPage() {
	const { events, loading, error } = useCalendarEvents();
	const [view, setView] = (0, import_react.useState)("list");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		title: "Events",
		subtitle: "Shared calendar for the next 30 days.",
		testId: "events-page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${view === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`,
					"data-testid": "events-viewList-button",
					onClick: () => setView("list"),
					children: "Upcoming"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${view === "calendar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`,
					"data-testid": "events-viewCalendar-button",
					onClick: () => setView("calendar"),
					children: "Calendar"
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-500",
				"data-testid": "events-loading-text",
				children: "Loading events…"
			}) : null,
			!loading && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-amber-700",
				"data-testid": "events-error-text",
				children: error
			}) : null,
			!loading && view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, { events }) : null,
			!loading && view === "calendar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCalendar, { events }) : null
		]
	});
}
//#endregion
export { EventsPage as component };
