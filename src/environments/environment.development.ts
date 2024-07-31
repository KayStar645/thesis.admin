// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	api: 'https://localhost:7152',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// Import the functions you need from the SDKs you need

export const environment_firebase = {
	production: false,
	firebase: {
		apiKey: 'AIzaSyDEPhuT_XQrbBz0lWpx6fbbJQmfI7gw1YA',
		authDomain: 'image-supermarket.firebaseapp.com',
		projectId: 'image-supermarket',
		storageBucket: 'image-supermarket.appspot.com',
		messagingSenderId: '366915503759',
		appId: '1:366915503759:web:ea0d8a211e5801110012fa',
	},
};
