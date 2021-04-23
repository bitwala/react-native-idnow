import React, {Fragment} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { navigationRef } from './helpers/NavigationHelper';
import { withStyles } from '@ui-kitten/components';
import IdentificationCompleteScreen from './screens/IdentificationCompleteScreen/IdentifictionCompleteScreen';
import IdentificationFailedScreen from './screens/IdentificationFailedScreen/IdentifictionFailedScreen';
import LearnMoreScreen from './screens/LearnMoreScreen/LearnMoreScreen';
import LoaderScreen from './screens/Loader/LoaderScreen';
import IdNowCodeScreen from './screens/IdNowCodeScreen/IdNowCodeScreen';
import Identification from '../App';

const Stack = createStackNavigator();

const propTypes = {
  isLoggedIn: PropTypes.bool,
  eva: PropTypes.shape({
    style: PropTypes.object,
  }).isRequired,
};

const defaultProps = {
  isLoggedIn: false,
};

const App = ({eva: {style}}) => {
  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <SafeAreaView style={style.container}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName={'LoaderScreen'} headerMode={'none'}>
            <Fragment>
              <Stack.Screen name='LoaderScreen' component={LoaderScreen} />
              <Stack.Screen name='IdNowCodeScreen' component={IdNowCodeScreen} />
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='IdentificationScreen' component={Identification} />
              <Stack.Screen
                name='IdentificationComplete'
                component={IdentificationCompleteScreen}
              />
              <Stack.Screen
                name='IdentificationFailed'
                component={IdentificationFailedScreen}
              />
              <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
            </Fragment>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = theme => ({
  container: {
    flex: 1,
  },
});

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default withStyles(App, styles);
