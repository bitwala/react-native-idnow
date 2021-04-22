import React from 'react';
import {View} from 'react-native';
import {Text, withStyles} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import styles from './LearnMoreScreen.style';
import Swiper from 'react-native-swiper';

const propTypes = {
  eva: PropTypes.shape({
    style: PropTypes.object,
  }).isRequired,
  onLogin: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  resetAuth: PropTypes.func,
  installationUrl: PropTypes.string,
};

const defaultProps = {
  onLogin: () => {},
  isLoggingIn: false,
};

const LearnMoreComponent = ({navigation, eva}) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
      <View key="3">
        <Text>Third page</Text>
      </View>
    </Swiper>
  );
};

LearnMoreComponent.propTypes = propTypes;
LearnMoreComponent.defaultProps = defaultProps;
const LearnMoreScreen = withStyles(LearnMoreComponent, styles);

export default LearnMoreScreen;
