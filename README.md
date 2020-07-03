# react-native-idnow

[![npm version](https://badge.fury.io/js/react-native-idnow.svg)](http://badge.fury.io/js/react-native-idnow)
[![npm total downloads](https://img.shields.io/npm/dt/react-native-idnow.svg)](https://img.shields.io/npm/dt/react-native-idnow.svg)
[![npm monthly downloads](https://img.shields.io/npm/dm/react-native-idnow.svg)](https://img.shields.io/npm/dm/react-native-idnow.svg)

React Native IDnow binding for iOS/Android platforms.

## Installation

Using npm:

```sh
npm install --save react-native-idnow
```

or using yarn:

```sh
yarn add react-native-idnow
```

## Linking

### Automatic

> ⚠️ Only follow this step if you are using react-native <= 0.59 as react-native >= 0.60 is using auto-linking.

```sh
react-native link react-native-idnow
```

### Manual

<details>
    <summary>iOS</summary>

- See "Additional _required_ steps"

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-idnow` and add `RNIdnow.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNIdnow.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)
   </details>

<details>
    <summary>Android</summary>

1. Open up `android/app/src/main/java/[...]/MainActivity.java`

- Add `import com.bitwala.idnow.RNIdnowPackage;` to the imports at the top of the file
- Add `new RNIdnowPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':react-native-idnow'
   project(':react-native-idnow').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-idnow/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     compile project(':react-native-idnow')
   ```
4. Add the following to `repositories` in `android/build.gradle`:
   ```
    maven {
      url "https://raw.githubusercontent.com/idnow/de.idnow.android/de.idnow.android-4.2.0"
    }
   ```
   </details>

## Additional _required_ steps:

### Android

- Update `android/app/src/AndroidManifest.xml`:
  add `xmlns:tools="http://schemas.android.com/tools"` to the `manifest` tag
  add `tools:replace="android:icon,android:theme,android:allowBackup"` to the `application` tag

- See [IDnow AndroidManifest](https://github.com/idnow/de.idnow.android#androidmanifest) section

- (not required) To change colors, update `colors.xml` (see `/demo/ReactNativeIDnowSample/android/app/src/main/res/values/colors.xml`)

### iOS

- Add the following pod dependencies to your podfile:

```
pod 'IDnowSDK', '4.1.7'
```

- Then, run the following command:

```
pod install
```

- Add following to Info.plist:

```
	<key>NSCameraUsageDescription</key>
	<string>Need camera access for video streaming and identification</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>Need microphone access for video identification</string>
```

- Add `RNIdnow.h` and `RNIdnow.m` files to the ios project(see demo app)

## Usage

```javascript
import { IDnowManager } from 'react-native-idnow';

try {
	await IDnowManager.startVideoIdent({
		transactionToken: 'TST-XXXXX',
	});
} catch (e) {
	...
}
```
