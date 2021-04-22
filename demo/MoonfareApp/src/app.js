import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Alert, BackHandler} from 'react-native';
import Router from './router';
import {store} from './store';
import {ApplicationProvider} from '@ui-kitten/components';
import i18n from './i18n';
import {theme} from './theme';
import * as eva from '@eva-design/eva';
import { createConfig } from '@okta/okta-react-native';

export default class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    Alert.alert(
      i18n.t('EXIT.TITLE'),
      i18n.t('EXIT.SUBTITLE'),
      [
        {
          text: i18n.t('EXIT.CANCEL'),
          onPress: () => {},
          style: 'cancel',
        },
        {text: i18n.t('EXIT.OK'), onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };

  render() {
    return (
      <React.Fragment>
        <ApplicationProvider {...eva} theme={theme}>
          <Provider store={store}>
            <Router />
          </Provider>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}
