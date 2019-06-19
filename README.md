
# react-native-idnow

## Getting started

`$ npm install react-native-idnow --save`

### Mostly automatic installation

`$ react-native link react-native-idnow --platforms="android"`

### Manual installation


#### iOS

- See "Additional *required* steps"
<!-- 1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-idnow` and add `RNIdnow.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNIdnow.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`) -->

#### Android

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


### Additional *required* steps:

#### Android

- Update `android/build.gradle`:
  add `dirs "$rootDir/../node_modules/react-native-idnow/android/libs" to `allprojects.repositories.flatDir`

- Update `android/app/src/AndroidManifest.xml`:
  add `xmlns:tools="http://schemas.android.com/tools"` to the `manifest` tag
  add `tools:replace="android:icon,android:theme,android:allowBackup"` to the `application` tag

- (not required) To change colors, update `colors.xml` (see `/demo/ReactNativeIDnowSample/android/app/src/main/res/values/colors.xml`)

- install and link `react-native-sentry`

#### iOS

- Add the following pod dependencies to your podfile:
```
pod 'IDnowSDK'
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
import RNIdnow from 'react-native-idnow';

// TODO: What to do with the module?
RNIdnow;
```
  