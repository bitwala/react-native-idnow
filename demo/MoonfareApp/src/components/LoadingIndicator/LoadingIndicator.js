import { withStyles } from '@ui-kitten/components';
import React from 'react';
import Video from 'react-native-video';
import styles from './Loader.style.js';
import { navigate } from '../../RootNavigation';

const LoaderButton = ({ ...customProps }) => {
  const {
    eva: {
      style,
    },
  } = customProps;

  setTimeout(() => navigate('Login'), 100);

  return (
    <Video
      source={require('./../../../assets/loader.mp4')}
      style={style.backgroundVideo}
      muted={true}
      repeat={true}
      resizeMode={'fit'}
      rate={1.0}
      ignoreSilentSwitch={'obey'}
    />
  );
};

export default withStyles(LoaderButton, styles);
