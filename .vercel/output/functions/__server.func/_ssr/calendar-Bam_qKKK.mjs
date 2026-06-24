//#region node_modules/.nitro/vite/services/ssr/assets/calendar-Bam_qKKK.js
/** Default upcoming window: ~3 months */
var UPCOMING_EVENTS_DAYS = 90;
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
function getGoogleMapsUrl(location) {
	const query = location.replace(/\s*\n+\s*/g, ", ").trim();
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
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
function formatEventSchedule(event) {
	const start = parseEventDate(event.start);
	const end = parseEventDate(event.end);
	if (event.allDay) {
		const dateLabel = new Intl.DateTimeFormat(void 0, {
			weekday: "long",
			month: "long",
			day: "numeric"
		}).format(start);
		if (getEventDayKey(event.start) === getEventDayKey(event.end)) return `${dateLabel} · All day`;
		return `${dateLabel} – ${new Intl.DateTimeFormat(void 0, {
			month: "long",
			day: "numeric"
		}).format(end)} · All day`;
	}
	return `${new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	}).format(start)} – ${new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "2-digit"
	}).format(end)}`;
}
function formatSectionDate(dayKey) {
	const [year, month, day] = dayKey.split("-").map(Number);
	const date = new Date(year, month - 1, day);
	const todayKey = getLocalDayKey(/* @__PURE__ */ new Date());
	const tomorrow = /* @__PURE__ */ new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowKey = getLocalDayKey(tomorrow);
	const shortDate = new Intl.DateTimeFormat(void 0, {
		month: "long",
		day: "numeric",
		year: "numeric"
	}).format(date);
	const fullDate = new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	}).format(date);
	if (dayKey === todayKey) return `Today, ${shortDate}`;
	if (dayKey === tomorrowKey) return `Tomorrow, ${shortDate}`;
	return fullDate;
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
function filterEvents(events, query) {
	const normalized = query.trim().toLowerCase();
	if (!normalized) return events;
	return events.filter((event) => {
		return [
			event.title,
			event.description ?? "",
			event.location ?? ""
		].join(" ").toLowerCase().includes(normalized);
	});
}
//#endregion
export { UPCOMING_EVENTS_DAYS, eventsForDay, filterEvents, formatEventSchedule, formatEventTime, formatMonthLabel, formatSectionDate, getEventDayKey, getGoogleMapsUrl, getLocalDayKey, getMonthGrid, groupEventsByDay, isSameDay };
