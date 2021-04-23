import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import images from '../../src/constants/images';

const Logo = () => {
  return (
    <View
      style={{
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source={images.logo} />
    </View>
  );
};

export default Logo;
