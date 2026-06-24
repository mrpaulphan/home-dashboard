self.addEventListener("push", (e) => {
	let t = e.data?.json(), n = t?.title ?? "Family Hub", r = t?.body ?? "You have a new update.", i = t?.url ?? "/";
	e.waitUntil(self.registration.showNotification(n, {
		body: r,
		icon: "/icons/icon-192.svg",
		badge: "/icons/icon-192.svg",
		data: { url: i }
	}));
}), self.addEventListener("notificationclick", (e) => {
	e.notification.close();
	let t = e.notification.data?.url ?? "/";
	e.waitUntil(self.clients.matchAll({
		type: "window",
		includeUncontrolled: !0
	}).then((e) => {
		for (let n of e) if ("focus" in n) return n.navigate(t), n.focus();
		return self.clients.openWindow(t);
	}));
}), self.addEventListener("install", () => {
	self.skipWaiting();
}), self.addEventListener("activate", (e) => {
	e.waitUntil(self.clients.claim());
});
//#endregion
