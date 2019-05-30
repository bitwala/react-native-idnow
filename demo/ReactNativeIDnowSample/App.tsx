/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, NativeModules } from 'react-native';
import IDnow from 'react-native-idnow';


interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>react-native-idnow demo</Text>
        <Button
          title="Start video identification"
          onPress={async () => {
            await IDnow.startVideoIdent({
              showVideoOverviewCheck: true,
              showErrorSuccessScreen: true,
              companyId: '',
              transactionToken: 'TST-JZQEA',
              environment: 'TEST',
              
              // environment: 'CUSTOM', // if 'CUSTOM', apiHost, webHost and websocketHost must also be set
              // apiHost: '',
              // webHost: '',
              // websocketHost: '',
              // videoHost: '',
              // stunHost: '',
              // stunPort: '',
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});