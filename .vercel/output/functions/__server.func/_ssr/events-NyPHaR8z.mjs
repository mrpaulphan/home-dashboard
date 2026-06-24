import { __toESM } from "../_runtime.mjs";
import { eventsForDay, filterEvents, formatEventTime, formatMonthLabel, formatSectionDate, getEventDayKey, getLocalDayKey, getMonthGrid, isSameDay } from "./calendar-Bam_qKKK.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { ChevronLeft, ChevronRight, Clock, Search, X } from "../_libs/lucide-react.mjs";
import { EventDetailSheet, EventList, useCalendarEvents } from "./useCalendarEvents-fd4nvBEu.mjs";
import { PageShell } from "./PageShell-CGfmo_X5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-NyPHaR8z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventCalendar({ events, searchQuery }) {
	const [viewDate, setViewDate] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [selectedDayKey, setSelectedDayKey] = (0, import_react.useState)(() => getLocalDayKey(/* @__PURE__ */ new Date()));
	const [selectedEvent, setSelectedEvent] = (0, import_react.useState)(null);
	const monthCells = (0, import_react.useMemo)(() => getMonthGrid(viewDate), [viewDate]);
	const selectedEvents = (0, import_react.useMemo)(() => {
		const [year, month, day] = selectedDayKey.split("-").map(Number);
		return eventsForDay(events, new Date(year, month - 1, day));
	}, [events, selectedDayKey]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		"data-testid": "events-calendar-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
						"data-testid": "events-calendar-prevMonth-button",
						"aria-label": "Previous month",
						onClick: () => {
							setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold text-primary",
						"data-testid": "events-calendar-month-header",
						children: formatMonthLabel(viewDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
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
				className: "rounded-lg border border-border bg-card p-3 shadow-sm",
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
						className: "py-1 text-center text-xs font-medium uppercase text-muted-foreground",
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
							className: `min-h-14 rounded-md border p-1 text-left transition-colors ${isSelected ? "border-primary/40 bg-primary/10" : "border-transparent hover:bg-muted"} ${inCurrentMonth ? "text-foreground" : "text-muted-foreground/50"}`,
							"data-testid": `events-calendar-day-${dayKey}-button`,
							onClick: () => setSelectedDayKey(dayKey),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${isToday ? "bg-primary text-primary-foreground" : ""}`,
								children: day.getDate()
							}), dayEvents.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 space-y-0.5",
								children: [dayEvents.slice(0, 2).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									role: "button",
									tabIndex: 0,
									className: "truncate rounded bg-primary/15 px-1 text-[10px] font-medium text-primary",
									"data-testid": `events-calendar-day-${dayKey}-event-${event.id}-button`,
									onClick: (clickEvent) => {
										clickEvent.stopPropagation();
										setSelectedEvent(event);
									},
									onKeyDown: (keyboardEvent) => {
										if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
											keyboardEvent.preventDefault();
											keyboardEvent.stopPropagation();
											setSelectedEvent(event);
										}
									},
									children: event.title
								}, event.id)), dayEvents.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] font-medium text-muted-foreground",
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
				className: "rounded-lg border border-border bg-card p-4 shadow-sm",
				"data-testid": "events-calendar-selectedDay-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 text-base font-semibold text-foreground",
					"data-testid": "events-calendar-selectedDay-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-4 w-1 shrink-0 rounded-full bg-primary",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: formatSectionDate(selectedDayKey)
					})]
				}), selectedEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					"data-testid": "events-calendar-selectedDay-empty-text",
					children: searchQuery ? `No matching events on this day for "${searchQuery}".` : "No events on this day."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: selectedEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "w-full rounded-md bg-muted px-3 py-2 text-left text-sm transition-colors hover:bg-accent/60",
						"data-testid": `events-calendar-selectedDay-${event.id}-button`,
						onClick: () => setSelectedEvent(event),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: event.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 flex items-start gap-1 text-primary/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
								className: "mt-0.5 h-3.5 w-3.5 shrink-0",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatEventTime(event) })]
						})]
					}) }, event.id))
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventDetailSheet, {
		event: selectedEvent,
		onClose: () => setSelectedEvent(null)
	})] });
}
function EventSearch({ value, onChange, resultCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		"data-testid": "events-search-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value,
					placeholder: "Search events...",
					className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 pr-9 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20",
					"data-testid": "events-search-input",
					onChange: (event) => onChange(event.target.value)
				}),
				value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground",
					"data-testid": "events-search-clear-button",
					"aria-label": "Clear search",
					onClick: () => onChange(""),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})
				}) : null
			]
		}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted-foreground",
			"data-testid": "events-search-resultCount-text",
			children: [
				resultCount ?? 0,
				" ",
				resultCount === 1 ? "event" : "events",
				" found"
			]
		}) : null]
	});
}
function EventsPage() {
	const { events, loading, error } = useCalendarEvents();
	const [view, setView] = (0, import_react.useState)("list");
	const [query, setQuery] = (0, import_react.useState)("");
	const filteredEvents = (0, import_react.useMemo)(() => filterEvents(events, query), [events, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		title: "Events",
		subtitle: "Live from Google Calendar. Edits stay in Google — we just read them.",
		testId: "events-page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventSearch, {
					value: query,
					resultCount: filteredEvents.length,
					onChange: setQuery
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `rounded-md px-3 py-2 text-sm font-medium transition-colors ${view === "list" ? "bg-background text-primary shadow-sm ring-1 ring-primary/25" : "text-muted-foreground hover:text-foreground"}`,
					"data-testid": "events-viewList-button",
					onClick: () => setView("list"),
					children: "Upcoming"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `rounded-md px-3 py-2 text-sm font-medium transition-colors ${view === "calendar" ? "bg-background text-primary shadow-sm ring-1 ring-primary/25" : "text-muted-foreground hover:text-foreground"}`,
					"data-testid": "events-viewCalendar-button",
					onClick: () => setView("calendar"),
					children: "Calendar"
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				"data-testid": "events-loading-text",
				children: "Loading events…"
			}) : null,
			!loading && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-destructive",
				"data-testid": "events-error-text",
				children: error
			}) : null,
			!loading && view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventList, {
				events: filteredEvents,
				emptyMessage: query ? `No events match "${query}".` : "No upcoming events in the next 3 months."
			}) : null,
			!loading && view === "calendar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCalendar, {
				events: filteredEvents,
				searchQuery: query
			}) : null
		]
	});
}
//#endregion
export { EventsPage as component };
