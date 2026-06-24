import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-admin-BaHRc9Bb.js
var adminApp = null;
var adminDb = null;
function getPrivateKey() {
	const key = process.env.FIREBASE_PRIVATE_KEY;
	if (!key) return null;
	return key.replace(/\\n/g, "\n");
}
function getAdminApp() {
	if (adminApp) return adminApp;
	const existing = getApps();
	if (existing.length > 0) {
		adminApp = existing[0];
		return adminApp;
	}
	const projectId = process.env.FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	const privateKey = getPrivateKey();
	if (!projectId || !clientEmail || !privateKey) throw new Error("Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
	adminApp = initializeApp({ credential: cert({
		projectId,
		clientEmail,
		privateKey
	}) });
	return adminApp;
}
function getAdminDb() {
	if (!adminDb) adminDb = getFirestore(getAdminApp());
	return adminDb;
}
//#endregion
export { getAdminDb };
