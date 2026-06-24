import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { Timestamp, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usePackages-BqHf7-a0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var db = getFirestore(initializeApp({
	apiKey: "AIzaSyAItgXm6rNJlaqadQc5RUVC6YhyvEnc4pM",
	authDomain: "home-dashboard-a6669.firebaseapp.com",
	projectId: "home-dashboard-a6669",
	storageBucket: "home-dashboard-a6669.firebasestorage.app",
	messagingSenderId: "920865731475",
	appId: "1:920865731475:web:a05ac9958f5842d07aee66"
}));
var STALE_MS = 2880 * 60 * 1e3;
function toDate(value) {
	if (value instanceof Timestamp) return value.toDate();
	if (value instanceof Date) return value;
	return null;
}
function getLastSeen(pkg) {
	return pkg.last_seen_at ?? pkg.arrived_at;
}
function usePackages() {
	const [packages, setPackages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		return onSnapshot(query(collection(db, "packages"), orderBy("arrived_at", "desc")), (snapshot) => {
			const nextPackages = snapshot.docs.map((document) => {
				const data = document.data();
				return {
					id: document.id,
					recipient: data.recipient,
					description: String(data.description ?? ""),
					carrier: String(data.carrier ?? "Luxor"),
					code: data.code ? String(data.code) : null,
					arrived_at: toDate(data.arrived_at),
					last_seen_at: toDate(data.last_seen_at),
					raw_message: data.raw_message ? String(data.raw_message) : void 0
				};
			});
			setPackages(nextPackages);
			setLoading(false);
			setError(null);
			const now = Date.now();
			for (const pkg of nextPackages) {
				const lastSeen = getLastSeen(pkg);
				if (!lastSeen) continue;
				if (now - lastSeen.getTime() > STALE_MS) deleteDoc(doc(db, "packages", pkg.id));
			}
		}, (nextError) => {
			setError(nextError.message);
			setLoading(false);
		});
	}, []);
	return {
		packages,
		loading,
		error
	};
}
async function markPackagePickedUp(packageId) {
	await deleteDoc(doc(db, "packages", packageId));
}
function formatRecipient(recipient) {
	return recipient === "paul" ? "Paul" : "Sarah";
}
function formatRelativeArrival(date) {
	if (!date) return "Just arrived";
	const diffMs = Date.now() - date.getTime();
	const hours = Math.floor(diffMs / (1e3 * 60 * 60));
	if (hours < 1) return "Just arrived";
	if (hours < 24) return `${hours}h ago`;
	return `${Math.floor(hours / 24)}d ago`;
}
//#endregion
export { formatRecipient, formatRelativeArrival, markPackagePickedUp, usePackages };
