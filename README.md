# NetInfoTester
A testing application for React Native NetInfo isConnected.

I created this app to test react-native issue [#8615](https://github.com/facebook/react-native/issues/8615), see my PR [#17397](https://github.com/facebook/react-native/pull/17397).

The app reports an initial manually fetched `NetInfo.isConnected.fetch()` value and does not subscribe to changes to that value.  Pressing the `Refresh` button will again manually fetch the `isConnected` value.  Pressing `Start/Stop Listening` will (un)subscribe the app to changes in `isConnected`.

You can view the app through the [Expo Client app](http://onelink.to/jcpnyt).  Once installed, you can then find the app at the following link or by scanning the provided QR code with the Expo Client App.

https://expo.io/@alburdet619/netinfo-tester

![QR]

[QR]: ./resources/images/expo_qr.png