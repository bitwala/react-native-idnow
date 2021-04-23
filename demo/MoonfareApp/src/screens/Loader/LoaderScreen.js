import React from 'react';
import {
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { withStyles } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import Logo from '../../components/Logo';
import styles from '../LoginScreen/LoginScreen.style';
import images from '../../constants/images';

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoaderScreenComponent = ({ navigation, eva }) => {
  const { navigate } = navigation;
  const deviceHeight = Dimensions.get('window').height;

  setTimeout(() => navigate('IdNowCodeScreen'), 2000);

  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
    }}>
      <ScrollView
        style={{
          height: deviceHeight,
        }}>
        <Logo />
        <View style={{
          height: deviceHeight,
        }}>
          <LoadingIndicator />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

LoaderScreenComponent.propTypes = propTypes;
export default withStyles(LoaderScreenComponent, styles);
