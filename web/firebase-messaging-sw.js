importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
	apiKey: "AIzaSyDiLSBLfNnZfHdLlDOzM75CiM9LyfY-XvY",
	authDomain: "food-363521.firebaseapp.com",
	projectId: "food-363521",
	storageBucket: "food-363521.appspot.com",
	messagingSenderId: "991765250165",
	appId: "1:991765250165:web:ef991ca768a71ef7bff83c",
	databaseURL: "...",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
	const promiseChain = clients
		.matchAll({
			type: "window",
			includeUncontrolled: true,
		})
		.then((windowClients) => {
			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i];
				windowClient.postMessage(payload);
			}
		})
		.then(() => {
			const title = payload.notification.title;
			const options = {
				body: payload.notification.score,
			};
			return registration.showNotification(title, options);
		});
	return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
	console.log("notification received: ", event);
});
