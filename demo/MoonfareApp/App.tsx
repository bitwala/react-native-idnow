import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import {IDnowManager} from 'react-native-idnow';
import {createConfig} from '@okta/okta-react-native';

interface Props {}
export default class App extends Component<Props> {
  componentDidMount() {
    createConfig({
      // issuer: 'https://moonfare.oktapreview.com/oauth2/default', // optional
      clientId: '0oa1hw0ibx7QAqcEs0x7',
      redirectUri: 'http://localhost:8081',
      endSessionRedirectUri: 'http://localhost:8081',
      discoveryUri: 'https://moonfare.oktapreview.com',
      scopes: ['openid', 'profile', 'offline_access'],
      requireHardwareBackedKeyStore: false,
      androidChromeTabColor: '#FF00AA',
    });
  }

  render() {
    const options = {
      showVideoOverviewCheck: true,
      transactionToken: 'TST-LEMQV',
      environment: 'TEST',
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>react-native-idnow demo</Text>
        <Button
          title="Start video identification"
          onPress={async () => {
            try {
              const resp = await IDnowManager.startVideoIdent(options);
              console.warn('==== resp', resp);
            } catch (e) {
              console.warn('==== e', e);
            }
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
  },
});
