import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import {IDnowManager} from 'react-native-idnow';

interface Props {}
export default class App extends Component<Props> {
  render() {
    const options = {
      showVideoOverviewCheck: true,
      transactionToken: 'TST-QAFWM',
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
