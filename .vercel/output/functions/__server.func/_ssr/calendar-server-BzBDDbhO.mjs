import { UPCOMING_EVENTS_DAYS } from "./calendar-Bam_qKKK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-server-BzBDDbhO.js
function getIcalUrl() {
	return process.env.GOOGLE_CALENDAR_ICAL_URL || process.env.VITE_GOOGLE_CALENDAR_ICAL_URL || null;
}
function getCalendarConfig() {
	const calendarId = process.env.VITE_GOOGLE_CALENDAR_ID;
	const apiKey = process.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_FIREBASE_API_KEY;
	if (!calendarId) throw new Error("VITE_GOOGLE_CALENDAR_ID is not configured.");
	if (!apiKey) throw new Error("Google Calendar API key is not configured. Set VITE_GOOGLE_API_KEY or GOOGLE_CALENDAR_ICAL_URL.");
	return {
		calendarId,
		apiKey
	};
}
function mapGoogleEvent(item) {
	const startValue = item.start?.dateTime ?? item.start?.date;
	const endValue = item.end?.dateTime ?? item.end?.date;
	if (!startValue || !item.id) return null;
	return {
		id: item.id,
		title: item.summary?.trim() || "Untitled event",
		description: item.description?.trim() || null,
		start: startValue,
		end: endValue ?? startValue,
		allDay: Boolean(item.start?.date && !item.start.dateTime),
		location: item.location?.trim() || null
	};
}
async function fetchFromGoogleApi(days) {
	const { calendarId, apiKey } = getCalendarConfig();
	const timeMin = /* @__PURE__ */ new Date();
	const timeMax = /* @__PURE__ */ new Date();
	timeMax.setDate(timeMax.getDate() + days);
	const params = new URLSearchParams({
		key: apiKey,
		timeMin: timeMin.toISOString(),
		timeMax: timeMax.toISOString(),
		singleEvents: "true",
		orderBy: "startTime",
		maxResults: "100"
	});
	const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
	const response = await fetch(url);
	const data = await response.json();
	if (!response.ok) throw new Error(data.error?.message ?? "Failed to load calendar events.");
	return (data.items ?? []).map(mapGoogleEvent).filter((event) => event !== null);
}
async function fetchUpcomingCalendarEvents(days = 90) {
	const icalUrl = getIcalUrl();
	if (icalUrl) {
		const { fetchIcalEvents } = await import("./calendar-ical-1b0_X5wl.mjs");
		return fetchIcalEvents(icalUrl, days);
	}
	return fetchFromGoogleApi(days);
}
//#endregion
export { UPCOMING_EVENTS_DAYS, fetchUpcomingCalendarEvents };
