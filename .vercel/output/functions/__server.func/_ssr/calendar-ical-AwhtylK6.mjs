//#region node_modules/.nitro/vite/services/ssr/assets/calendar-ical-AwhtylK6.js
function unfoldIcs(text) {
	return text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
}
function parseIcsDate(value, params = "") {
	const isUtc = params.includes("TZID=UTC") || value.endsWith("Z");
	if (value.length === 8) {
		const year = value.slice(0, 4);
		const month = value.slice(4, 6);
		const day = value.slice(6, 8);
		return {
			iso: `${year}-${month}-${day}`,
			allDay: true,
			date: new Date(Number(year), Number(month) - 1, Number(day))
		};
	}
	const year = value.slice(0, 4);
	const month = value.slice(4, 6);
	const day = value.slice(6, 8);
	const hour = value.slice(9, 11);
	const minute = value.slice(11, 13);
	const second = value.slice(13, 15) || "00";
	const date = isUtc ? /* @__PURE__ */ new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`) : /* @__PURE__ */ new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
	return {
		iso: date.toISOString(),
		allDay: false,
		date
	};
}
function parseEventBlock(block) {
	const lines = block.split("\n");
	const fields = /* @__PURE__ */ new Map();
	for (const line of lines) {
		const separator = line.indexOf(":");
		if (separator === -1) continue;
		const rawKey = line.slice(0, separator);
		const value = line.slice(separator + 1).trim();
		const key = rawKey.split(";")[0];
		fields.set(key, value);
		fields.set(`${rawKey}`, value);
	}
	const uid = fields.get("UID");
	const summary = fields.get("SUMMARY");
	const dtStartLine = [...fields.entries()].find(([key]) => key.startsWith("DTSTART"))?.[0];
	const dtEndLine = [...fields.entries()].find(([key]) => key.startsWith("DTEND"))?.[0];
	if (!uid || !summary || !dtStartLine) return null;
	const startParams = dtStartLine.includes(";") ? dtStartLine.slice(dtStartLine.indexOf(";")) : "";
	const endParams = dtEndLine?.includes(";") ? dtEndLine.slice(dtEndLine.indexOf(";")) : "";
	const start = parseIcsDate(fields.get(dtStartLine), startParams);
	const end = dtEndLine ? parseIcsDate(fields.get(dtEndLine), endParams) : start;
	return {
		id: uid,
		title: summary,
		description: fields.get("DESCRIPTION") ?? null,
		start: start.allDay ? start.iso : start.iso,
		end: end.allDay ? end.iso : end.iso,
		allDay: start.allDay,
		location: fields.get("LOCATION") ?? null
	};
}
function parseIcsEvents(text, days = 30) {
	const blocks = unfoldIcs(text).split("BEGIN:VEVENT").slice(1);
	const windowStart = /* @__PURE__ */ new Date();
	windowStart.setHours(0, 0, 0, 0);
	return blocks.map((block) => parseEventBlock(block.split("END:VEVENT")[0] ?? block)).filter((event) => event !== null).filter((event) => {
		const start = event.allDay ? /* @__PURE__ */ new Date(`${event.start}T00:00:00`) : new Date(event.start);
		return start >= windowStart && start <= max;
	}).sort((left, right) => new Date(left.start).getTime() - new Date(right.start).getTime());
}
async function fetchIcalEvents(url, days = 30) {
	const response = await fetch(url);
	if (!response.ok) throw new Error("Failed to load calendar feed.");
	return parseIcsEvents(await response.text(), days);
}
//#endregion
export { fetchIcalEvents };
