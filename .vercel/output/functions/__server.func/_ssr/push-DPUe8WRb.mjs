import { __toESM } from "../_runtime.mjs";
import { require_src } from "../_libs/web-push.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/push-DPUe8WRb.js
var import_src = /* @__PURE__ */ __toESM(require_src());
async function getAdminDb() {
	const { getAdminDb: loadAdminDb } = await import("./firebase-admin-BaHRc9Bb.mjs");
	return loadAdminDb();
}
function getVapidConfig() {
	const publicKey = process.env.VITE_VAPID_PUBLIC_KEY;
	const privateKey = process.env.VAPID_PRIVATE_KEY;
	const subject = process.env.VAPID_SUBJECT ?? "mailto:family-hub@example.com";
	if (!publicKey || !privateKey) throw new Error("VAPID keys are not configured.");
	return {
		publicKey,
		privateKey,
		subject
	};
}
function configureWebPush() {
	const { publicKey, privateKey, subject } = getVapidConfig();
	import_src.default.setVapidDetails(subject, publicKey, privateKey);
}
function subscriptionDocId(endpoint) {
	return Buffer.from(endpoint).toString("base64url");
}
async function savePushSubscription(subscription, deviceLabel) {
	const db = await getAdminDb();
	const id = subscriptionDocId(subscription.endpoint);
	await db.collection("push_subscriptions").doc(id).set({
		endpoint: subscription.endpoint,
		keys: subscription.keys,
		device_label: deviceLabel ?? null,
		created_at: /* @__PURE__ */ new Date(),
		updated_at: /* @__PURE__ */ new Date()
	}, { merge: true });
	return id;
}
async function sendPushToAll(payload) {
	configureWebPush();
	const snapshot = await (await getAdminDb()).collection("push_subscriptions").get();
	const body = JSON.stringify({
		title: payload.title,
		body: payload.body,
		url: payload.url ?? "/"
	});
	const results = await Promise.allSettled(snapshot.docs.map(async (doc) => {
		const data = doc.data();
		try {
			await import_src.default.sendNotification({
				endpoint: data.endpoint,
				keys: data.keys
			}, body);
		} catch (error) {
			const statusCode = error && typeof error === "object" && "statusCode" in error ? error.statusCode : void 0;
			if (statusCode === 404 || statusCode === 410) await doc.ref.delete();
			throw error;
		}
	}));
	const sent = results.filter((result) => result.status === "fulfilled").length;
	return {
		sent,
		failed: results.length - sent,
		total: results.length
	};
}
//#endregion
export { savePushSubscription, sendPushToAll };
