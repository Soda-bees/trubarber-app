// import React from "react";
// import messaging from "@react-native-firebase/messaging"
// import formatToJSON from "../FormatToJson";
// import NavigationService from "../NavigationService";

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }

// export async function notificationListners() {

//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Received FCM Background Message');
//   });

//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     console.log('Received FCM Message',
//       formatToJSON(remoteMessage)
//     );
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage,
//     );
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//         );
//       }
//     });

//   return unsubscribe;
// }
